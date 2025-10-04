// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Role } from '@prisma/client';

declare global {
  namespace App {
    // interface Error {}
    
    // Extend the Locals interface
    interface Locals {
      user?: {
        id: string;
        email: string;
        role: Role;
      };
    }
    
    // Extend the Platform interface for JWT
    interface Platform {
      env: {
        JWT_SECRET: string;
        JWT_EXPIRES_IN: string;
      };
    }
    
    // Interface for JWT payload
    interface JwtPayload {
      userId: string;
      email: string;
      role: Role;
      iat?: number;
      exp?: number;
    }
    
    // Interface for user registration
    interface RegisterUser {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    }
    
    // Interface for user login
    interface LoginUser {
      email: string;
      password: string;
    }
    
    // Interface for auth response
    interface AuthResponse {
      success: boolean;
      user?: {
        id: string;
        email: string;
        role: Role;
        firstName?: string | null;
        lastName?: string | null;
      };
      token?: string;
      error?: string;
    }
  }
}

export {};
