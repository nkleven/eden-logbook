import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

const AUTH0_DOMAIN = process.env.EXPO_PUBLIC_AUTH0_DOMAIN || '';
const AUTH0_CLIENT_ID = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID || '';
const AUTH0_AUDIENCE = process.env.EXPO_PUBLIC_AUTH0_AUDIENCE || '';

const discovery = {
  authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
  tokenEndpoint: `https://${AUTH0_DOMAIN}/oauth/token`,
  revocationEndpoint: `https://${AUTH0_DOMAIN}/oauth/revoke`,
  userInfoEndpoint: `https://${AUTH0_DOMAIN}/userinfo`,
};

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'pilotlogbook',
});

interface User {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,

  loadStoredAuth: async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('accessToken');
      const storedUser = await SecureStore.getItemAsync('user');

      if (storedToken && storedUser) {
        // Verify token is still valid
        const response = await fetch(discovery.userInfoEndpoint, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (response.ok) {
          set({
            accessToken: storedToken,
            user: JSON.parse(storedUser),
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }
      }
    } catch (error) {
      console.error('Failed to load stored auth:', error);
    }

    set({ isLoading: false });
  },

  login: async () => {
    try {
      set({ isLoading: true });

      const request = new AuthSession.AuthRequest({
        clientId: AUTH0_CLIENT_ID,
        redirectUri,
        scopes: ['openid', 'profile', 'email', 'offline_access'],
        extraParams: {
          audience: AUTH0_AUDIENCE,
        },
      });

      const result = await request.promptAsync(discovery);

      if (result.type === 'success' && result.params.code) {
        // Exchange code for tokens
        const tokenResponse = await AuthSession.exchangeCodeAsync(
          {
            clientId: AUTH0_CLIENT_ID,
            code: result.params.code,
            redirectUri,
            extraParams: {
              code_verifier: request.codeVerifier || '',
            },
          },
          discovery
        );

        const accessToken = tokenResponse.accessToken;

        // Fetch user info
        const userInfoResponse = await fetch(discovery.userInfoEndpoint, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const user = await userInfoResponse.json();

        // Store securely
        await SecureStore.setItemAsync('accessToken', accessToken);
        await SecureStore.setItemAsync('user', JSON.stringify(user));

        if (tokenResponse.refreshToken) {
          await SecureStore.setItemAsync('refreshToken', tokenResponse.refreshToken);
        }

        set({
          accessToken,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Login failed:', error);
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      await SecureStore.deleteItemAsync('user');

      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
}));
