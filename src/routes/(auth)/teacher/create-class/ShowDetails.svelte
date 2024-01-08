<script lang="ts">
	import { createClassState } from "$lib";
	import Button from "$lib/Components/Button.svelte";
	import type { CreatedCLassTB } from "$lib/types";
	import { scale } from "svelte/transition";
	import DeleteClass from "./(shoow-details-component)/DeleteClass.svelte";

    export let index: number;
    export let createdClass: CreatedCLassTB;


</script>



<div class="fixed bottom-0 top-0 left-0 right-0 bg-[#00000050] p-2">
    <div class="mx-auto md:max-w-[79dvw] flex flex-col min-h-[100dvh] justify-center" in:scale>

        <div class="text-black bg-gray-200 p-2 rounded-t-lg items-center flex flex-col sm:flex-row">
            <h3 class="h3 w-full">{createdClass.class_name} Details</h3>
            <div class="flex gap-2">

                {#if $createClassState.showConfirmDropClass === createdClass.id}
                    <DeleteClass {createdClass} />
                {/if}

                <Button title="Click to drop this class: All learners who are enrolled in this class will be removed." 
                style="bg-red-500 px-2 py-[0.3rem] rounded-lg text-sm text-white font-bold" 
                name="Drop Class" 
                on:click={() => $createClassState.showConfirmDropClass = createdClass.id}
                />
               

                <Button title="Click, to back." style="bg-green-500 px-2 py-[0.3rem] rounded-lg text-sm text-white font-bold" name="Back" on:click={() => $createClassState.showDetail = 0.1} />
            </div>
        </div>

        <!--Large Screen-->
        <div class="">
            <div class="overflow-auto shadow hidden md:block h-[80dvh] bg-white rounded-b-lg">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b-2">
                        <tr class="">
                            <th class="p-3 text-sm font-semibold tracking-wide text-left truncate">Learner Name</th>
                            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left truncate">Date Enrolled</th>
                            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left truncate">Action</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-100 overflow-auto">
                        
                        <tr class="bg-[#F6D3D9]">
                        
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <span>Kevin Thos Morato</span>
                            </td>
                        
    
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <span class="p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50">12/12/2024</span>
                            </td>
    
                            <td class="p-2">
                                <Button style="bg-red-500 px-2 py-[0.3rem] rounded-lg text-sm text-white font-bold" name="Kick" />
                            </td>
                        </tr>
                    
                    </tbody>
                </table>
            </div>
        </div>

        <!--Small Screens-->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden p-2 bg-slate-400 h-[80dvh] rounded-b-lg overflow-auto">

            <div class="bg-[#F6D3D9] space-y-3 p-4 rounded-lg shadow flex flex-col gap-2 h-fit">

                <div class="text-sm font-bold flex items-center">
                    <span class="w-full">Kevin Tomas Morato</span>

                    <Button style="bg-red-500 px-2 rounded-lg text-sm text-white font-bold" name="Kick" />
                </div>

                <div class="text-sm">
                    <span>Date Enrolled: 12/12/2024</span>
                </div>

        
            </div>

            
           
        </div>
    </div>
</div>