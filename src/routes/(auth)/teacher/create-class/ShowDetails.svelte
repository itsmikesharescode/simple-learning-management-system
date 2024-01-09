<script lang="ts">
	import { createClassState } from "$lib";
	import Button from "$lib/Components/Button.svelte";
	import type { CreatedCLassTB, LearnersType } from "$lib/types";
	import { scale } from "svelte/transition";
	import DeleteClass from "./(shoow-details-component)/DeleteClass.svelte";
	import { onMount } from "svelte";
    import {Circle3} from "svelte-loading-spinners";
	import KickEnrolled from "./(shoow-details-component)/KickEnrolled.svelte";

    export let createdClass: CreatedCLassTB;

    let showEnrolledArray: LearnersType[] | null = null;

    onMount( async () => {

        const classCode = createdClass.class_code;

        const res = await fetch("/teacher/create-class/API", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({classCode})
        });

        const {status, msg, enrolledLearners} = await res.json() as {status: number, msg: string, enrolledLearners: LearnersType[]};

        if(status === 200) showEnrolledArray = enrolledLearners;
        else if(status === 402) console.log(msg);

     });

    const updateEnrolledLearners = (e: CustomEvent) => showEnrolledArray = e.detail;


</script>



<div class="fixed bottom-0 top-0 left-0 right-0 bg-[#00000050] p-2 z-10">
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
                {#if showEnrolledArray}
                    
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b-2">
                            <tr class="">
                                <th class="p-3 text-sm font-semibold tracking-wide text-left truncate">Learner Name</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-left truncate">Learner Email</th>
                                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left truncate">Date Enrolled</th>
                                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left truncate">Action</th>
                            </tr>
                        </thead>

                    
                        {#if showEnrolledArray.length}
                            <tbody class="divide-y divide-gray-100 overflow-auto">
                                {#each showEnrolledArray as enrolledLearner }
                                    <tr class="bg-[#F6D3D9]">
                                        
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span>{enrolledLearner.fullname}</span>
                                        </td>

                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span>{enrolledLearner.user_email}</span>
                                        </td>
                                    
                
                                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span class="p-1.5 text-xs font-medium uppercase tracking-wider bg-opacity-50">{enrolledLearner.created_at}</span>
                                        </td>
                
                                        <td class="p-2">
                                            <KickEnrolled {enrolledLearner} on:updateEnrolledLearners={updateEnrolledLearners}/>
                                        </td>
                                        
                                    
                                    </tr>
                                {/each}
                            </tbody>
                        {:else}
                            <div class="p-10">
                                <p class="font-bold">There are currently no enrolled learners.</p>
                            </div>
                        {/if}
                        
                    </table>
                    
                {:else}
                    <div class="w-full bg-[#000000d3] h-full flex flex-col items-center justify-center">
                        <Circle3 size="100" unit="px" duration="1s" />
                        <p class="text-white">Connecting to database..</p>
                    </div>
                {/if}
            </div>
        </div>

        <!--Small Screens-->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden p-2 bg-slate-400 h-[80dvh] rounded-b-lg overflow-auto">

            {#if showEnrolledArray}

                {#if showEnrolledArray.length}
                    <div class="flex flex-col gap-2 sm:flex-row">
                        {#each showEnrolledArray ?? [] as enrolledLearner }
                            <div class="bg-[#F6D3D9] space-y-3 p-4 rounded-lg shadow gap-2 sm:h-fit">

                                <div class="text-sm font-bold flex items-center">
                                    <span class="w-full">{enrolledLearner.fullname}</span>

                                    <KickEnrolled {enrolledLearner} on:updateEnrolledLearners={updateEnrolledLearners}/>
                                </div>

                                <div class="">
                                    <span>{enrolledLearner.user_email}</span>
                                </div>

                                <div class="text-sm">
                                    <span>Date Enrolled: {enrolledLearner.created_at}</span>
                                </div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="p-10">
                        <p class="font-bold text-center">There are currently no enrolled learners.</p>
                    </div>
                {/if}

            {:else}
                <div class="w-full bg-[#000000d3] h-full flex flex-col items-center justify-center">
                    <Circle3 size="100" unit="px" duration="1s" />
                    <p class="text-white">Connecting to database..</p>
                </div>
            {/if}

        </div>

    </div>
</div>