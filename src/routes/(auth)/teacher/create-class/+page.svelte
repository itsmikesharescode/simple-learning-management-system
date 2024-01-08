<script lang="ts">
	import Button from "$lib/Components/Button.svelte";
	import ShowDetails from "./ShowDetails.svelte";
	import { createClassState, navState } from "$lib";
	import { onMount } from "svelte";
	import type { PageServerData } from "./$types";
	import RenderLargeScreenClasses from "./RenderLargeScreenClasses.svelte";
	import RenderMobileScreenClasses from "./RenderMobileScreenClasses.svelte";
	import CreateClass from "./CreateClass.svelte";

    export let data: PageServerData;

    onMount(() => {
        const { session, getClass } = data;
        if(session) $navState.session = session, $createClassState.createdClass = getClass;

    });


</script>

<CreateClass />


<div class="p-2 md:max-w-[80dvw] mx-auto min-h-[100dvh] flex flex-col gap-3">

    <Button title="Click, to create class." style="bg-green-500 max-w-fit p-2 rounded-lg text-white mt-[5dvh] text-sm font-bold" name="Create Class" on:click={() => $createClassState.showCreateClass = true}/>

    <!--Large Screens-->
    <RenderLargeScreenClasses />

    <!--Small Screens-->
    <RenderMobileScreenClasses />

</div>


