<script lang="ts">
	import { enhance } from "$app/forms";
	import { myClassesState, navState } from "$lib";
	import Button from "$lib/Components/Button.svelte";
	import { toast } from "$lib/Helpers/toast";
	import type { JoinedAndCreatedClassTB, ServerNews } from "$lib/types";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import type { Session } from "@supabase/supabase-js";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { scale } from "svelte/transition";

    const toastStore = getToastStore();

    type JoinClassNews = {
        session: Session
        msg: string
        getDedicatedClass: JoinedAndCreatedClassTB[]
        errors: { classCode: string[] }
    }

	let showJoinClass = false;
    let joinClassLoader = false;
    let inputErrors: { classCode: string[] } | null = null;

    const joinClassNews: SubmitFunction = () => 
    {

        joinClassLoader = true;

        return async ({ result, update }) => {
            const {status, data: {session, msg, getDedicatedClass, errors}} = result as ServerNews<JoinClassNews>
                
            switch (status) {
                case 200:
                    $navState.session = session;
                    $myClassesState.getDedicatedClass = getDedicatedClass;
                    toast(msg, false, toastStore);
                    joinClassLoader = false;
                    showJoinClass = false;
                    break;
                
                case 402:
                    joinClassLoader = false;
                    if(msg === `insert or update on table "joined_class_tb" violates foreign key constraint "joined_class_tb_class_code_fkey"`) toast("Class code does not exist.", true, toastStore);
                    else toast(msg, true, toastStore);
                    break;
                
                case 403:
                    inputErrors = errors;
                    joinClassLoader = false;
                    break;

                default:
                    break;
            };
            await update();
        };
    };
    
</script>



<Button title="Click to join a class." style="bg-green-500 w-fit mx-auto p-2 rounded-lg text-sm text-white font-bold" name="Join a class" on:click={() => showJoinClass = true} />


{#if showJoinClass}
    <div class="fixed left-0 right-0 top-0 bottom-0 bg-[#00000050] p-2">
        <div class="min-h-[80dvh]  mx-auto md:max-w-xl flex items-center" in:scale>
    
            <form method="POST" action="?/joinClass" enctype="multipart/form-data" use:enhance={joinClassNews} class="w-full">
    
                <div class="bg-green-500 rounded-t-lg p-2">
                    <h3 class="h3 text-center text-white text-base">Join a class</h3>
                </div>
                
                <div class="p-4 bg-white rounded-b-lg flex flex-col gap-2">
                    <label>
                        <span class="text-sm font-bold">Class Code</span>
                        <input name="classCode" type="text" class="input p-2 text-sm rounded-lg" />
                        {#each inputErrors?.classCode ?? [] as err }
                            <p class="text-red-500 text-xs p-2">{err}</p>
                        {/each}
                    </label>
    
                    <div class="flex justify-end gap-2">
                        <Button title="Click to cancel joining." type="button" style= "w-full sm:w-fit text-white font-bold bg-red-500 p-2 rounded-lg text-sm" name="Cancel" on:click={() => showJoinClass = false } />
    
                        <Button title="Click to join a class." style= "w-full sm:w-fit text-white font-bold bg-green-500 p-2 rounded-lg text-sm" name="Confirm" loader={joinClassLoader} loader_name="Joining." />
                    </div>
                </div>
    
            </form>
        </div>
    </div>
{/if}
