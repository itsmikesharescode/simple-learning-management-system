<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/Components/Button.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { scale } from "svelte/transition";
    import type { ServerNews } from "$lib/types";

    import { getToastStore } from '@skeletonlabs/skeleton';
	import { toast } from "$lib/Helpers/toast";
	import { navState } from "$lib";
	import type { Session } from "@supabase/supabase-js";
	import { goto } from "$app/navigation";

    const toastStore = getToastStore();
    
    type LoginErrors = {
        email: string[]
        password: string[]
    };
    

    type LoginNews = {
        session: Session
        msg: string
        errors: LoginErrors
    };

    let loginErrors:LoginErrors | null = null;
    let loginLoader = false;

    const loginNews: SubmitFunction = () => {

        loginLoader = true;

        return async ({ result, update }) => {

            const {status, data: {session, msg, errors}} = result as ServerNews<LoginNews>;
                
            switch (status) {
    
                case 200:
                    toast(msg, false, toastStore);
                    const { user: { user_metadata: { role } } } = session;
                    $navState.session = session;
                    loginLoader = false;
                    
                    if (role === "Teacher") goto("/teacher/create-class");
                    else if (role === "Learner") goto("/learner/my-classes");
                    
                    break;
                
                case 402:
                    toast(msg, true, toastStore);
                    loginLoader = false;
                    break;
                
                case 403:
                    loginErrors = errors;
                    loginLoader = false;
                    break;

                default:
                    break;
            };
            await update();
        };
    };

</script>

<div class="min-h-[100dvh] flex justify-center items-center" in:scale>

    <form method="POST" action="?/signIn" enctype="multipart/form-data" use:enhance={loginNews} 
    class="flex flex-col gap-2 w-[350px] bg-[#ffffffec] p-4 rounded-xl">

        <h1 class="h1 text-center">Sign in</h1>

        <span class="text-center text-xs opacity-50 font-bold">Sign in to Learning System Management</span>

        <label>
            <span class="font-bold text-sm">Email:</span>
            <input name="email" title="Your account email." type="email" class="input p-2 text-sm" placeholder="Enter email address."/>
            {#each loginErrors?.email ?? [] as err }
                <p class="text-red-500 text-xs p-2">{err}</p>
            {/each}
        </label>

        <label>
            <span class="font-bold text-sm">Password:</span>
            <input name="password" title="Your account password." type="password" class="input p-2 text-sm" placeholder="Enter password."/>
            {#each loginErrors?.password ?? [] as err }
                <p class="text-red-500 text-xs p-2">{err}</p>
            {/each}
        </label>

        <Button 
        title="Click, to sign in your account." 
        style="w-full bg-green-500 p-2 rounded-3xl input text-white text-sm font-bold" 
        name="Sign in"
        loader={loginLoader}
        loader_name="Signing in..."
        />

        <a title="Click, to recover your account via email." href="?forgot-pass" class="text-center mt-5 text-sm text-blue-500 underline">Forgot Password?</a>

        <p title="Click, to sign up and join our community of learners." class="text-center mt-5 text-sm">Not yet a member? <a href="?sign-up" class="text-center mt-5 text-blue-500 underline">Create account</a></p>
    </form>

</div>