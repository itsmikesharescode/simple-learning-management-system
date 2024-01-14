<script lang="ts">
	import { onMount } from "svelte";
    import RenderLargeScreenAnnouncement from "./RenderLargeScreenAnnouncement.svelte";
    import RenderMobileScreenAnnouncement from "./RenderMobileScreenAnnouncement.svelte";
	import type { PageServerData } from "./$types";
	import { myAnnouncementsState, navState } from "$lib";

    export let data: PageServerData;

    const {dedicatedAnnouncement, session} = data;

    onMount( () => {
        $navState.activeItem = "/learner/announcements";
        if(session) $navState.session = session, $myAnnouncementsState.showAnnouncements = dedicatedAnnouncement; 
    })

</script>

<div class="p-2 md:max-w-[80dvw] mx-auto min-h-[100dvh] flex flex-col gap-3">

    <!--LargeScreen-->
    <div class="mt-[5dvh]">
        <RenderLargeScreenAnnouncement />
    </div>

    <!--MobileScreen-->
    <RenderMobileScreenAnnouncement />
</div>