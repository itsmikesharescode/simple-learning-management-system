<script lang="ts">
    import { createAnnouncementState } from "$lib";   
	import Button from "$lib/Components/Button.svelte";
    import ShowDetails from "./ShowDetails.svelte";

</script>



<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
    {#each $createAnnouncementState.showAnnouncements ?? [] as createdAnnouncement, index }
        <div class="bg-white space-y-3 p-4 rounded-lg shadow flex flex-col gap-2">

            <div class="text-sm font-bold">
                <span>{createdAnnouncement.announcement_title}</span>
            </div>

            <div class="flex truncate gap-2 text-sm">
                <span>Class Name:</span>
                <p class="text-red-500">{createdAnnouncement.created_class_name}</p>
            </div>

            <div class="flex items-center space-x-2 text-sm">
          
                <div class="flex truncate gap-2">
                    <span>Enroll Code:</span>
                    <p class="text-red-500">{createdAnnouncement.created_class_code}</p>
                </div>

            </div>

            <ShowDetails {createdAnnouncement} />

            <Button title="Click, to view details" style="bg-blue-500 p-2 rounded-lg text-sm text-white font-bold" name="View Details" />

        </div>
    {/each}
   
</div>