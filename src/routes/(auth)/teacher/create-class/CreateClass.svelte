<script lang="ts">
	import { enhance } from "$app/forms";
	import { createClassState, navState } from "$lib";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import type { Session } from "@supabase/supabase-js";
	import type { SubmitFunction } from "@sveltejs/kit";
    import type { CreatedCLassTB, ServerNews } from "$lib/types";
	import { toast } from "$lib/Helpers/toast";
	import Button from "$lib/Components/Button.svelte";
	import { scale } from "svelte/transition";

    
    const toastStore = getToastStore();
    type InputCreateClass = {
        className: string[]
        classDetails: string[]
    };

    type CreateClassNews = {
        getClass: CreatedCLassTB[]
        msg: string
        errors: InputCreateClass
        session: Session
    }

    let createClassErrors: InputCreateClass | null = null;

    let createClassLoader = false;

    const createClassNews: SubmitFunction = () => {

        createClassLoader = true;
        return async ({ result, update }) => {

            const {status, data: { msg, errors, session, getClass }} = result as ServerNews<CreateClassNews>;
                
            switch (status) {
                case 200:
                    $navState.session = session;
                    $createClassState.createdClass = getClass;
                    toast(msg, false, toastStore);
                    createClassLoader = false;
                    $createClassState.showCreateClass = false;
                    break;
                
                case 402:
                    toast(msg, true, toastStore);
                    createClassLoader = false;
                    break;
                
                case 403:
                    createClassErrors = errors;
                    createClassLoader = false;
                    break;

                default:
                    break;
            };
            await update();
        };
    };

</script>


{#if $createClassState.showCreateClass}
    <div class="fixed bottom-0 top-0 left-0 right-0 bg-[#00000050] p-2">

        <form method="POST" action="?/createClass" enctype="multipart/form-data" use:enhance={createClassNews} class="mx-auto md:max-w-xl min-h-[70dvh] flex flex-col justify-center" in:scale>
            <div class="bg-gray-100 p-3 rounded-t-lg">
                <h4 class="text-center text-black">Create Class</h4>
            </div>

            <div class="bg-white p-3 flex flex-col gap-2 rounded-b-lg">
                <label>
                    <span class="text-sm text-black font-bold">Class Name:</span>
                    <input name="className" type='text' class="input rounded-lg p-2 text-sm" />
                    {#each createClassErrors?.className ?? [] as err }
                        <p class="text-red-500 text-xs p-2">{err}</p>
                    {/each}
                </label>

                <label>
                    <span class="text-sm text-black font-bold">Class Details:</span>
                    <input name="classDetails" type='text' class="input rounded-lg p-2 text-sm" />
                    {#each createClassErrors?.classDetails ?? [] as err }
                        <p class="text-red-500 text-xs p-2">{err}</p>
                    {/each}
                </label>

                <div class="flex gap-2">
                    <Button type="button" style="bg-red-500 w-full p-2 rounded-lg text-sm text-white font-bold" name="Cancel" on:click={() => $createClassState.showCreateClass = false} />
                    <Button style="bg-green-500 w-full p-2 rounded-lg text-sm text-white font-bold" name="Create" loader={createClassLoader} loader_name="Creating.." />
                </div>
            </div>
        </form>

    </div>
{/if}