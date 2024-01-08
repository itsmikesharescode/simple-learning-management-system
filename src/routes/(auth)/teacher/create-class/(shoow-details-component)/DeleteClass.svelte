<script lang="ts">
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import Button from "$lib/Components/Button.svelte";
	import type { CreatedCLassTB, ServerNews } from "$lib/types";
	import type { Session } from "@supabase/supabase-js";
	import { toast } from "$lib/Helpers/toast";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import { createClassState, navState } from "$lib";
	import { encryptMessage } from "$lib/Helpers/clientEncryption";
	import { scale } from "svelte/transition";

    const toastStore = getToastStore();

    export let createdClass: CreatedCLassTB;

    type DropClassError = {
        confirm: string[]
    };

    type DropClassNews = {
        session: Session
        getClass: CreatedCLassTB[]
        msg: string
        errors: DropClassError
    };

    let inputErrors: DropClassError | null = null;
    let dropClassLoader = false;

    const dropClassNews: SubmitFunction = () => 
    {
        dropClassLoader = true;

        return async ({ result, update }) => {
            const {status, data: {session, msg, errors, getClass}} = result as ServerNews<DropClassNews>
                
            switch (status) {
                case 200:
                    toast(msg, false, toastStore);
                    $navState.session = session;
                    $createClassState.createdClass = getClass;
                    dropClassLoader = false;
                    $createClassState.showDropClass = false;
                    $createClassState.showDetail = 0.1;
                    break;
                
                case 402:
                    toast(msg, true, toastStore);
                    dropClassLoader = false;
                    break;
                
                case 403:
                    inputErrors = errors;
                    dropClassLoader = false;
                    break;

                default:
                    break;
            };
            await update();
        };
    };

    let inputVal = "";

    let condition = "Drop this class.";

    const listener = () =>
    {
        if(inputVal === condition) console.log("clear errors");
        inputErrors = null;
    };

    const classRef = encryptMessage(JSON.stringify(createdClass));

</script>

<div class="fixed left-0 right-0 top-0 bottom-0 bg-[#00000050] p-2">
    <div class="min-h-[80dvh]  mx-auto md:max-w-xl flex items-center" in:scale>

        <form method="POST" action="?/dropClass" enctype="multipart/form-data" use:enhance={dropClassNews} class="w-full">

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

                <input type="hidden" name="classRef" class="hidden" value={classRef} />

                <div class="flex justify-end gap-2">
                    <Button type="button" style= "w-full sm:w-fit text-white font-bold bg-green-500 p-2 rounded-lg text-sm" name="Cancel" on:click={() => $createClassState.showConfirmDropClass = 0.1} />

                    <Button style= "w-full sm:w-fit text-white font-bold bg-red-500 p-2 rounded-lg text-sm" name="Confirm" loader={dropClassLoader} loader_name="Deleting.."/>
                </div>
            </div>

        </form>
    </div>
</div>