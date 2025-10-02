// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { User, Role } from '@prisma/client';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: {
        id: string;
        email: string;
        role: Role;
      };
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
