import type { SupabaseClient } from "@supabase/supabase-js";

import type { Session } from "@supabase/supabase-js";

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient
			supabaseAdmin: SupabaseClient
			getSession:() => Promise <Session | null>
			checkRole: () => Promise <"has teacher" | "no teacher" | "has error">
		}

		
	}
}


export {};