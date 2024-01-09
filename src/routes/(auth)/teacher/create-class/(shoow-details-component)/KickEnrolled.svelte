<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/Components/Button.svelte";
	import { encryptMessage } from "$lib/Helpers/clientEncryption";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { scale } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import { toast } from "$lib/Helpers/toast";
	import type { Session } from "@supabase/supabase-js";
	import type { ServerNews } from "$lib/types";
	import { navState } from "$lib";

    const toastStore = getToastStore();

    const dispatch = createEventDispatcher();

    export let enrolledLearner: LearnersType;

    type LearnersType = {
        id: number
        created_at: string
        user_email: string
        class_code: string
        fullname: string
    }

    type KickLearnerError = {
        confirm: string[]
    };

    type KickLearnerNews = {
        session: Session
        msg: string
        enrolledLearners: LearnersType[]
        errors: KickLearnerError
    };

    let inputErrors: KickLearnerError | null = null;

    let showKickLearner = false;

    let inputVal = "";

    let condition = "Kick this learner.";

    const listener = () =>
    {
        if(inputVal === condition) console.log("clear errors");
    };

    let kickLoader = false;

    const kickLearnerNews: SubmitFunction = () => {

        kickLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {session, msg, enrolledLearners, errors} } = result as ServerNews<KickLearnerNews>;
                
            switch (status) {
                
                case 200:
                    toast(msg, false, toastStore);
                    $navState.session = session;
                    dispatch("updateEnrolledLearners", enrolledLearners);
                    kickLoader = false;
                    showKickLearner = false;
                    break;
                
                case 402:
                    toast(msg, true, toastStore);
                    kickLoader = false;
                    break;
                
                case 403:
                    inputErrors = errors;
                    kickLoader = false
                    break;
                default:
                    break;
            };
            await update();
        };
    };

    const learnerObj = encryptMessage(JSON.stringify({id: enrolledLearner.id, classCode: enrolledLearner.class_code}));

</script>
{#if showKickLearner}
    <div class="fixed left-0 right-0 top-0 bottom-0 bg-[#00000050] p-2">
        <div class="min-h-[80dvh]  mx-auto md:max-w-xl flex items-center" in:scale>

            <form method="POST" action="?/kickLearner" enctype="multipart/form-data" use:enhance={kickLearnerNews}  class="w-full">

                <div class="bg-red-600 rounded-t-lg p-2">
                    <h3 class="h3 text-center text-white text-base">This action cannot be undone. Please confirm.</h3>
                </div>
                
                <div class="p-4 bg-white rounded-b-lg flex flex-col gap-2">
                    <label>
                        <span class="flex gap-1 text-sm p-2">Write <p class="text-black font-bold bg-slate-300 px-2">{condition}</p> to confirm. </span>
                        <input name="confirm" type="text" class="input rounded-lg p-2 text-sm {inputVal === condition ? "text-white bg-green-500" : "" }" bind:value={inputVal} on:keyup={listener} />
                        {#each inputErrors?.confirm ?? [] as err }
                            <p class="text-red-500 text-xs p-2">{err}</p>
                        {/each}
                        
                    </label>

                    <input name="learnerObj" type="hidden" class="hidden" value={learnerObj} />

                    <div class="flex justify-end gap-2">
                        <Button type="button" style= "w-full sm:w-fit text-white font-bold bg-green-500 p-2 rounded-lg text-sm" name="Cancel" on:click={() => showKickLearner = false} />

                        <Button style= "w-full sm:w-fit text-white font-bold bg-red-500 p-2 rounded-lg text-sm" name="Confirm"
                        loader={kickLoader}
                        loader_name="Kicking."
                        />

                    </div>
                </div>

            </form>
        </div>
    </div>
{/if}

<Button title="Click, to kick this learner." style="bg-red-500 px-2 py-[0.3rem] rounded-lg text-sm text-white font-bold" name="Kick" on:click={() => showKickLearner = true}/>