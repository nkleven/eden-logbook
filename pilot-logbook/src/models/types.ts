import { z } from 'zod';

// Aircraft categories and classes per FAA
export const AircraftCategory = z.enum([
  'AIRPLANE',
  'ROTORCRAFT',
  'GLIDER',
  'LIGHTER_THAN_AIR',
  'POWERED_LIFT',
  'POWERED_PARACHUTE',
  'WEIGHT_SHIFT_CONTROL',
]);

export const AircraftClass = z.enum([
  'SINGLE_ENGINE_LAND',
  'SINGLE_ENGINE_SEA',
  'MULTI_ENGINE_LAND',
  'MULTI_ENGINE_SEA',
  'HELICOPTER',
  'GYROPLANE',
]);

export const ApproachType = z.enum([
  'ILS',
  'LOC',
  'VOR',
  'NDB',
  'GPS',
  'RNAV',
  'LPV',
  'VISUAL',
  'CIRCLING',
  'PAR',
  'ASR',
]);

// Aircraft schema
export const AircraftSchema = z.object({
  id: z.string().uuid(),
  oderId: z.string().uuid(),
  tailNumber: z.string().min(1).max(10),
  make: z.string(),
  model: z.string(),
  category: AircraftCategory,
  class: AircraftClass,
  typeRating: z.string().optional(), // For aircraft requiring type rating
  isComplex: z.boolean().default(false),
  isHighPerformance: z.boolean().default(false),
  isTailwheel: z.boolean().default(false),
  isTurbine: z.boolean().default(false),
  isMultiEngine: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});

// Approach logged during flight
export const ApproachSchema = z.object({
  type: ApproachType,
  runway: z.string(),
  airport: z.string().length(4), // ICAO code
  circleToLand: z.boolean().default(false),
});

// Flight entry - the core logbook entry
export const FlightEntrySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  
  // Date and route
  date: z.date(),
  aircraftId: z.string().uuid(),
  departureAirport: z.string().length(4), // ICAO
  arrivalAirport: z.string().length(4),
  route: z.string().optional(), // Intermediate waypoints
  
  // Flight times (in decimal hours, e.g., 1.5 = 1:30)
  totalTime: z.number().min(0),
  picTime: z.number().min(0).default(0), // Pilot in Command
  sicTime: z.number().min(0).default(0), // Second in Command
  dualReceived: z.number().min(0).default(0), // Training received
  dualGiven: z.number().min(0).default(0), // CFI instruction given
  soloTime: z.number().min(0).default(0),
  
  // Conditions
  crossCountryTime: z.number().min(0).default(0), // >50nm
  nightTime: z.number().min(0).default(0),
  actualInstrumentTime: z.number().min(0).default(0), // IMC
  simulatedInstrumentTime: z.number().min(0).default(0), // Hood/foggles
  
  // Landings
  dayLandings: z.number().int().min(0).default(0),
  nightLandings: z.number().int().min(0).default(0),
  dayFullStopLandings: z.number().int().min(0).default(0),
  nightFullStopLandings: z.number().int().min(0).default(0),
  
  // Approaches
  approaches: z.array(ApproachSchema).default([]),
  holds: z.number().int().min(0).default(0),
  
  // Remarks and signatures
  remarks: z.string().optional(),
  instructorName: z.string().optional(),
  instructorCertNumber: z.string().optional(),
  instructorSignature: z.string().optional(), // Base64 signature image
  
  // Sync metadata
  createdAt: z.date(),
  updatedAt: z.date(),
  syncedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

// User profile with certificate info
export const PilotProfileSchema = z.object({
  id: z.string().uuid(),
  auth0Id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  
  // FAA certificate info
  certificateNumber: z.string().optional(),
  certificateType: z.enum(['STUDENT', 'SPORT', 'RECREATIONAL', 'PRIVATE', 'COMMERCIAL', 'ATP']).optional(),
  ratings: z.array(z.string()).default([]), // e.g., ['INSTRUMENT', 'MULTI_ENGINE']
  medicalClass: z.enum(['FIRST', 'SECOND', 'THIRD', 'BASIC_MED']).optional(),
  medicalExpiry: z.date().optional(),
  flightReviewDate: z.date().optional(),
  
  // Preferences
  defaultAircraftId: z.string().uuid().optional(),
  homeAirport: z.string().length(4).optional(),
  
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Currency tracking
export const CurrencyRequirementSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string(), // e.g., "Night Currency", "IFR Currency"
  requirement: z.string(), // Human readable requirement
  expiresAt: z.date(),
  isCurrent: z.boolean(),
});

// Export types
export type Aircraft = z.infer<typeof AircraftSchema>;
export type Approach = z.infer<typeof ApproachSchema>;
export type FlightEntry = z.infer<typeof FlightEntrySchema>;
export type PilotProfile = z.infer<typeof PilotProfileSchema>;
export type CurrencyRequirement = z.infer<typeof CurrencyRequirementSchema>;
export type AircraftCategoryType = z.infer<typeof AircraftCategory>;
export type AircraftClassType = z.infer<typeof AircraftClass>;
export type ApproachTypeType = z.infer<typeof ApproachType>;
