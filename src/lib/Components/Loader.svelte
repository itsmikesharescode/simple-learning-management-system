<script lang="ts">
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
	import { Circle3 } from "svelte-loading-spinners";
    

    const popupHover: PopupSettings = {
        event: 'hover',
        target: 'popupHover',
        placement: 'bottom'
    };
</script>



					

<div class="fixed left-0 right-0 bottom-0 top-0 z-10 bg-[#000000b0] flex flex-col gap-2 justify-center items-center">
   <div class="card p-4 variant-filled-secondary" data-popup="popupHover">
        <p>Slow internet? come visit my youtube first!</p>
        <div class="arrow variant-filled-secondary" />
    </div>

    <Circle3 size="140" />
   
    <p class="text-white">Loading Resources.</p>
    <p class="text-white text-sm">Created by <a href="https://www.youtube.com/@mikeSharesCode" target="_blank" class="text-yellow-600 font-bold underline" use:popup={popupHover}>@mikeSharesCode</a></p>
</div>