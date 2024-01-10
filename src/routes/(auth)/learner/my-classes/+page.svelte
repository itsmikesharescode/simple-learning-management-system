<script lang="ts">
	import JoinClass from "./JoinClass.svelte";
	import { myClassesState, navState } from "$lib";
	import RenderLargeScreenClasses from "./RenderLargeScreenClasses.svelte";
	import RenderMobileScreenClasses from "./RenderMobileScreenClasses.svelte";
	import { onMount } from "svelte";
	import type { PageServerData } from "./$types";

	export let data: PageServerData;

	onMount( () => {
		const {getDedicatedClass, session} = data;
		$navState.activeItem = "/learner/my-classes"
		if(session) $myClassesState.getDedicatedClass = getDedicatedClass as any[], $navState.session = session;
	});

</script>

<div class="p-2 md:max-w-[80dvw] mx-auto min-h-[100dvh] flex flex-col gap-3">
	{#if $myClassesState.getDedicatedClass?.length}
		<RenderLargeScreenClasses />

		<RenderMobileScreenClasses />
	{:else}	
		<div class="flex flex-col gap-4 mx-auto mt-[20dvh] p-2">

			<span class="text-sm text-center">
				Hi Thomas Morato! Welcome to <b>Simple Learning Mangement System</b>! We noticed you haven't joined in any classes yet.
			</span>

			<JoinClass />
		</div>
	{/if}

	

</div>