<script lang="ts">
	import { enhance } from "$app/forms";
	import { createAnnouncementState, navState } from "$lib";
	import Button from "$lib/Components/Button.svelte";
	import type { CreatedAnnouncementTB, ServerNews } from "$lib/types";
	import type { Session } from "@supabase/supabase-js";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { scale } from "svelte/transition";
    import {encryptMessage} from "$lib/Helpers/clientEncryption";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import { toast } from "$lib/Helpers/toast";

    const toastStore = getToastStore();
    
    type CreateAnnouncementError = {
        className: string[]
        classTitle: string[]
        announcementDetails: string[]
    };

    type CreateAnnouncementNews = {
        msg: string
        session: Session
        getAnnouncement: CreatedAnnouncementTB[]
        errors: CreateAnnouncementError
    };

    let inputErrors: CreateAnnouncementError | null = null;
    let createAnnouncementLoader = false;

    const createAnnouncementNews: SubmitFunction = () => 
    {
        createAnnouncementLoader = true;
        return async ({ result, update }) => 
        {
            const {status, data: {session, msg, getAnnouncement, errors} } = result as ServerNews<CreateAnnouncementNews>;
                
            switch (status) {
                case 200:
                    $navState.session = session;
                    $createAnnouncementState.showAnnouncements = getAnnouncement;
                    toast(msg, false, toastStore);
                    createAnnouncementLoader = false;
                    $createAnnouncementState.showCreateAnnouncement = false;
                    break;
                
                case 402:
                    toast(msg, true, toastStore);
                    createAnnouncementLoader = false;
                    break;
                
                case 403:
                    createAnnouncementLoader = false;
                    inputErrors = errors;
                    break;

                default:
                    break;

            };
            await update();
        };
    };

    


</script>

{#if $createAnnouncementState.showCreateAnnouncement}
    <div class="fixed bottom-0 top-0 left-0 right-0 bg-[#00000050] p-2 overflow-auto">

        <form method="POST" action="?/createAnnouncement" enctype="multipart/form-data" use:enhance={createAnnouncementNews} class="mx-auto md:max-w-xl min-h-[70dvh] flex flex-col justify-center" in:scale>
            <div class="bg-gray-100 p-3 rounded-t-lg">
                <h4 class="text-center text-black">Create Announcement</h4>
            </div>

            <div class="bg-white p-3 flex flex-col gap-2 rounded-b-lg">

                <label>
                    <span class="text-sm text-black font-bold">Class Name:</span>
                    <select name="className" class="select rounded-lg text-sm font-bold" >
                        {#each $createAnnouncementState.showClassName ?? [] as className }
                            <option value={encryptMessage(JSON.stringify(className))}>{className.class_name}</option>
                        {/each}
                    </select>
                    {#each inputErrors?.className ?? [] as err }
                        <p class="text-red-500 text-xs p-2">{err}</p>
                    {/each}
                </label>

                <label>
                    <span class="text-sm text-black font-bold">Class Announcement Title:</span>
                    <input name="classTitle" type='text' class="input rounded-lg p-2 text-sm" placeholder="Enter announcement title." />
                    {#each inputErrors?.classTitle ?? [] as err }
                        <p class="text-red-500 text-xs p-2">{err}</p>
                    {/each}
                </label>

                <label class="">
                    <span class="text-sm text-black font-bold">Announcement Details:</span>
                    <textarea name="announcementDetails" class="input rounded-lg p-2 text-sm" rows="5" placeholder="Enter announcement content." />
                    {#each inputErrors?.announcementDetails ?? [] as err }
                        <p class="text-red-500 text-xs p-2">{err}</p>
                    {/each}
                </label>

                <div class="flex gap-2">
                    <Button type="button" style="bg-red-500 w-full p-2 rounded-lg text-sm text-white font-bold" name="Cancel" on:click={ () => $createAnnouncementState.showCreateAnnouncement = false} />
                    <Button style="bg-green-500 w-full p-2 rounded-lg text-sm text-white font-bold" name="Create"   
                    loader={createAnnouncementLoader}
                    loader_name="Creating.."
                    />
                </div>
            </div>
        </form>

    </div>
{/if}