<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Toast, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import { initializeStores } from '@skeletonlabs/skeleton';
	
	import { navigating } from '$app/stores';
	import Loader from '$lib/Components/Loader.svelte';

	initializeStores();
			

</script>

<Toast position="tr" rounded="rounded-lg" spacing="space-x-2" padding="py-3 px-5" max={5} transitions={true} buttonDismiss="rounded-full text-red-500"/>



<div class="bg-[url('./lib/Components/Images/loading.svg')] ">
	{#if $navigating}
		<Loader />
	{/if}
	<slot />

</div>

