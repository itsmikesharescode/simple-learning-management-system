<script lang="ts">
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import Button from "$lib/Components/Button.svelte";
	import type { CreatedAnnouncementTB, ServerNews } from "$lib/types";
	import { scale } from "svelte/transition";
    import {createAnnouncementState, navState} from "$lib";
	import type { Session } from "@supabase/supabase-js";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import { toast } from "$lib/Helpers/toast";
    import {encryptMessage} from "$lib/Helpers/clientEncryption";

    const toastStore = getToastStore();

    export let createdAnnouncement: CreatedAnnouncementTB;

    type DeleteAnnounceErrors = {
        inputCompare: string[]
    };

    type DeleteAnnounceNews = {
        msg: string
        session: Session
        getAnnouncement: CreatedAnnouncementTB[]
        errors: DeleteAnnounceErrors
    }

    let inputErrors: DeleteAnnounceErrors | null = null;
    let deleteAnnounceLoader = false;

    const deleteAnnounceNews: SubmitFunction = () => 
    {
        deleteAnnounceLoader = true;
        return async ({ result, update }) => {
            const {status, data: {msg, session, getAnnouncement, errors} } = result as ServerNews<DeleteAnnounceNews>
                
            switch (status) {
                case 200:
                    toast(msg, false, toastStore);
                    $navState.session = session;
                    $createAnnouncementState.showAnnouncements = getAnnouncement;
                    deleteAnnounceLoader = false;
                    $createAnnouncementState.showWarning = false;
                    $createAnnouncementState.showDetails = 0.1;
                    break;
                
                case 402:
                    toast(msg, true, toastStore);
                    deleteAnnounceLoader = false;
                    break;
                
                case 403:
                    inputErrors = errors;
                    deleteAnnounceLoader = false;
                    break;

                default:
                    break;
            };
            await update();
        };
    };

    let inputVal = "";

    let condition = "Delete this announcement.";

    const listener = () =>
    {
        if(inputVal === condition) console.log("clear errors");
    };

    const createdAnnounceRef = encryptMessage(JSON.stringify(createdAnnouncement));

</script>


    <div class="min-h-[80dvh]  mx-auto md:max-w-xl flex items-center" in:scale>

        <form method="POST" action="?/deleteAnnounce" enctype="multipart/form-data" use:enhance={deleteAnnounceNews} class="w-full">

            <div class="bg-red-600 rounded-t-lg p-2">
                <h3 class="h3 text-center text-white text-base">This action cannot be undone. Please confirm.</h3>
            </div>
            
            <div class="p-4 bg-white rounded-b-lg flex flex-col gap-2">
                <label>
                    <span class="flex gap-1 text-sm p-2">Write <p class="text-black font-bold bg-slate-300 px-2">{condition}</p> to confirm. </span>
                    <input name="inputCompar" type="text" class="input rounded-lg p-2 text-sm {inputVal === condition ? "text-white bg-green-500" : "" }" bind:value={inputVal} on:keyup={listener} />
                    {#each [] ?? [] as err }
                        <p class="text-red-500 text-xs p-2">{err}</p>
                    {/each}
                    <p class="text-red-500 text-xs p-2">Your input does not match the instructions.</p>
                </label>

                <input name="createdAnnounceRef" type="hidden" class="hidden" value={createdAnnounceRef} />

                <div class="flex justify-end gap-2">
                    <Button type="button" style= "w-full sm:w-fit text-white font-bold bg-green-500 p-2 rounded-lg text-sm" name="Cancel" on:click={() => $createAnnouncementState.showWarning = false } />

                    <Button style= "w-full sm:w-fit text-white font-bold bg-red-500 p-2 rounded-lg text-sm" name="Confirm" loader={deleteAnnounceLoader} loader_name="Deleting." />
                </div>
            </div>

        </form>
    </div>
