<script lang="ts">
    import { createClassState } from "$lib";   
	import Button from "$lib/Components/Button.svelte";
	import ShowDetails from "./ShowDetails.svelte";

</script>



<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
    {#each $createClassState.createdClass ?? [] as createdClass, index }
        <div class="bg-white space-y-3 p-4 rounded-lg shadow flex flex-col gap-2">

            <div class="text-sm font-bold">
                <span>{createdClass.class_name}</span>
            </div>

            <div class="text-sm">
                <span>{createdClass.class_details}</span>
            </div>

            <div class="flex items-center space-x-2 text-sm">
                
                <div class="flex truncate gap-2">
                <span> Enrolled:</span>
                    <p class="">0</p>
                </div>

                <div class="flex truncate gap-2">
                    <span>Enroll Code:</span>
                    <p class="text-red-500">{createdClass.class_code}</p>
                </div>

            </div>

            <Button title="Click, to view details" style="bg-blue-500 p-2 rounded-lg text-sm text-white font-bold" name="View Details" on:click={() => $createClassState.showDetail = index} />

            {#if $createClassState.showDetail === index}
                <ShowDetails {index} {createdClass} />
            {/if}

        </div>
    {/each}
   
</div>