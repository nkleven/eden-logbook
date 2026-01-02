import { jwtVerify, createRemoteJWKSet } from 'jose';
import { HttpRequest } from '@azure/functions';

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || '';
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || '';

const JWKS = createRemoteJWKSet(
  new URL(`https://${AUTH0_DOMAIN}/.well-known/jwks.json`)
);

export interface AuthContext {
  userId: string;
  email: string;
  sub: string;
}

export async function verifyAuth(request: HttpRequest): Promise<AuthContext> {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Missing or invalid authorization header');
    (error as any).statusCode = 401;
    throw error;
  }

  const token = authHeader.slice(7);

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://${AUTH0_DOMAIN}/`,
      audience: AUTH0_AUDIENCE,
    });

    return {
      userId: payload.sub as string,
      email: (payload.email as string) || '',
      sub: payload.sub as string,
    };
  } catch (error) {
    const authError = new Error('Invalid token');
    (authError as any).statusCode = 401;
    throw authError;
  }
}

export function handleError(error: unknown): { status: number; body: object } {
  const status = (error as any)?.statusCode || 500;
  const message = error instanceof Error ? error.message : 'Internal server error';
  
  return {
    status,
    body: { error: message },
  };
}
