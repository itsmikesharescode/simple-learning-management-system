<script lang="ts">
	import { createClassState } from "$lib";
	import ShowDetails from "./ShowDetails.svelte";

</script>

<div class="overflow-auto rounded-lg shadow hidden md:block">
    <table class="w-full">

        <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
                <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left truncate">Class Name</th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left truncate">Course Details</th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left truncate">Enroll Code</th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left truncate">Enrolled</th>
            </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
            {#each $createClassState.createdClass ?? [] as createdClass, index }
                <tr class="bg-white">
                
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <button title="Click to view details of {createdClass.class_name}" class="font-bold text-blue-500 hover:underline transition-all active:scale-95"
                        on:click={() => $createClassState.showDetail = index}
                        >{createdClass.class_name}</button>
                    </td>
                
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {createdClass.class_details}
                    </td>

                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-red-500 bg-opacity-50">{createdClass.class_code}</span>
                    </td>

                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">0</td>
                </tr>
                

                {#if $createClassState.showDetail === index}
                    <ShowDetails {index} {createdClass} />
                {/if}

            {/each}
        
        </tbody>
    </table>
</div>