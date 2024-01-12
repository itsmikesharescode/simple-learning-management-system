<script lang="ts">
	import type { CreatedAnnouncementTB } from "$lib/types";
    import Button from "$lib/Components/Button.svelte";
    import {createAnnouncementState} from "$lib";
	import { scale } from "svelte/transition";
	import DeleteAnnouncement from "./(show-details-component)/DeleteAnnouncement.svelte";

    export let createdAnnouncement: CreatedAnnouncementTB;

</script>



<div class="fixed bottom-0 top-0 left-0 right-0 bg-[#00000050] p-2 z-10">

    <div class="" in:scale>
        {#if $createAnnouncementState.showWarning}
        
            <DeleteAnnouncement />
        
        {:else}

            <div class="min-h-[50dvh] mx-auto sm:max-w-xl  mt-[10dvh] text-black" in:scale>
                <h3 class="h3 bg-white text-center rounded-t-xl">{createdAnnouncement.announcement_title}</h3>
                <div class="bg-slate-300 p-4 rounded-b-xl flex flex-col gap-2 text-sm">
                
                    <span class="italic">Creator: {createdAnnouncement.announcement_creator} </span>
                    <span class="italic">Class Name: {createdAnnouncement.created_class_name} </span>
                    <span class="italic">Date Created: {createdAnnouncement.created_at} </span>
                    
                    
                    <div class="mt-5 overflow-auto max-h-[40dv] whitespace-break-spaces">
                        <p>
                            {createdAnnouncement.announcement_details}
                        </p>
                    </div>

                    <div class="mt-5 flex gap-2 sm:justify-end">
                    
                        <Button title="Click, to back." style="bg-green-500 p-2 rounded-lg text-sm w-full sm:w-fit text-white font-bold" name="Back" on:click={() => $createAnnouncementState.showDetails = 0.1} />
                        <Button title="Click, to delete." style="bg-red-500 p-2 rounded-lg text-sm w-full sm:w-fit text-white font-bold" name="Delete" on:click={() => $createAnnouncementState.showWarning = true} />
                    </div>
                
                </div>
                
            </div>
            
        {/if}
    </div>
</div>