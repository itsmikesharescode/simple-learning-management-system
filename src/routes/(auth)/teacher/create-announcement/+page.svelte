<script lang="ts">
	import { createAnnouncementState, navState } from "$lib";
	import Button from "$lib/Components/Button.svelte";
    import { onMount } from "svelte";
	import RenderLargeScreenAnnouncement from "./RenderLargeScreenAnnouncement.svelte";
	import CreateAnnouncement from "./CreateAnnouncement.svelte";
	import type { PageServerData } from "./$types";

    export let data: PageServerData;
    const {session, className, getAnnouncement} = data;

    onMount( () => {
        $navState.activeItem = "/teacher/create-announcement";

        if(session) $navState.session = session, $createAnnouncementState.showClassName = className, $createAnnouncementState.showAnnouncements = getAnnouncement;
        
    })

</script>

<CreateAnnouncement />

<div class="p-2 md:max-w-[80dvw] mx-auto min-h-[100dvh] flex flex-col gap-3">
    <Button title="Click, to create class." 
    style="bg-green-500 max-w-fit p-2 rounded-lg text-white mt-[5dvh] text-sm font-bold" 
    name="Create Announcement" on:click={() => $createAnnouncementState.showCreateAnnouncement = true}/>

    <!--Large Screen-->
    <RenderLargeScreenAnnouncement />

</div>