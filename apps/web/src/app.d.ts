// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { User } from "$lib/types";
import '@poppanator/sveltekit-svg/dist/svg.d.ts';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | null;
      session: Session | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  namespace Lucia {
    type Auth = import("auth").Auth;
    type DatabaseUserAttributes = {
      id?: string;
      email: string;
      emailVerified: boolean;
      name: string;
      role: string;
      avatar_url: string;
      github_username: string;
    };
    type DatabaseSessionAttributes = {};
  }
}

export { };

