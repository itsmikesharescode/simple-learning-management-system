<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import { navState } from "$lib";
	import Button from "$lib/Components/Button.svelte";
	import { toast } from "$lib/Helpers/toast";
	import type { ServerNews } from "$lib/types";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import type { Session } from "@supabase/supabase-js";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { scale } from "svelte/transition";

    const toastStore = getToastStore();

    type SignupErrors = {
        whoareyou: string[]
        fName: string[]
        mName: string[]
        lName: string[]
        email: string[]
        password: string[]
        confirmPassword: string[]
    };

    type SignupNews = {
        session: Session
        msg: string
        errors: SignupErrors
    };

    let signupErrors: SignupErrors | null = null;
    let signupLoader = false;

    const signupNews: SubmitFunction = () => {
        
        signupLoader = true;
        
        return async ({ result, update }) => {

            const {status, data: {session, msg, errors}} = result as ServerNews<SignupNews>
                
            switch (status) {

                case 200:
                    $navState.session = session;
                    const { user: {user_metadata: {role}} } = session;
                    toast(msg, false, toastStore);
                    signupLoader = false;

                    if(role === "Teacher") goto("/teacher/create-class");
                    else if(role === "Learner") goto("/learner/my-classes");

                    break;
                
                case 402:
                    toast(msg, true, toastStore);
                    signupLoader = false;
                    break;
                
                case 403:
                    signupErrors = errors;
                    signupLoader = false;
                    break;

                default:
                    break;
            };
            await update();
        };
    };

</script>

<div class="min-h-[100dvh] flex justify-center items-center p-4" in:scale>

    <form method="POST" action="?/signUp" enctype="multipart/form-data" use:enhance={signupNews} 
    class="flex flex-col gap-2 w-[500px] bg-[#ffffffec] p-5 rounded-xl my-5">

        <h1 class="h1 text-center">Sign up</h1>
        <span class="text-center text-xs opacity-50 font-bold">Sign up to Learning System Management</span>

        <label>
            <span class="font-bold text-sm">Who are you:</span>
            <select name="whoareyou" class="select text-sm rounded-lg">
                <option>Learner</option>
                <option>Teacher</option>
            </select>
            {#each signupErrors?.whoareyou ?? [] as err }
                <p class="text-red-500 text-xs p-2">{err}</p>
            {/each}
        </label>

        <label>
            <span class="font-bold text-sm">First Name:</span>
            <input name="fName" type="text" class="input p-2 text-sm rounded-lg" />
            {#each signupErrors?.fName ?? [] as err }
                <p class="text-red-500 text-xs p-2">{err}</p>
            {/each}
        </label>

        <label>
            <span class="font-bold text-sm">Middle Name:</span>
            <input name="mName" type="text" class="input p-2 text-sm rounded-lg" />
            {#each signupErrors?.mName ?? [] as err }
                <p class="text-red-500 text-xs p-2">{err}</p>
            {/each}
        </label>

        <label>
            <span class="font-bold text-sm">Last Name:</span>
            <input name="lName" type="text" class="input p-2 text-sm rounded-lg" />
            {#each signupErrors?.lName ?? [] as err }
                <p class="text-red-500 text-xs p-2">{err}</p>
            {/each}
        </label>

        <label>
            <span class="font-bold text-sm">Email:</span>
            <input name="email" type="email" class="input p-2 text-sm rounded-lg" />
            {#each signupErrors?.email ?? [] as err }
                <p class="text-red-500 text-xs p-2">{err}</p>
            {/each}
        </label>

        <label>
            <span class="font-bold text-sm">Password:</span>
            <input name="password" type="password" class="input p-2 text-sm rounded-lg" />
            {#each signupErrors?.password ?? [] as err }
                <p class="text-red-500 text-xs p-2">{err}</p>
            {/each}
        </label>

        <label>
            <span class="font-bold text-sm">Confirm Password:</span>
            <input name="confirmPassword" type="password" class="input p-2 text-sm rounded-lg" />
            {#each signupErrors?.confirmPassword ?? [] as err }
                <p class="text-red-500 text-xs p-2">{err}</p>
            {/each}
        </label>

        <Button style="w-full bg-green-500 p-2 rounded-lg input text-white text-sm font-bold" name="Create Account" loader={signupLoader} loader_name="Signing up.."/>

        <p class="text-center mt-5 text-sm">Already a member? <a href="/sign-in" class="text-center mt-5 text-blue-500 underline">Sign in</a></p>

    </form>

</div>