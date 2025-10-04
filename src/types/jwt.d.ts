import 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
  }

  export interface SignOptions {
    expiresIn?: string | number;
    [key: string]: unknown;
  }
}

declare global {
  namespace App {
    interface JwtPayload {
      userId: string;
      email: string;
      role: string;
      iat?: number;
      exp?: number;
    }
  }
}

// Para evitar errores de módulo
export {};
