<script lang="ts">
	import { myClassesState } from "$lib";
	import JoinClass from "./JoinClass.svelte";
	
</script>

<div class="flex justify-end">
    <div class="">
        <JoinClass />
    </div>
</div>

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
            {#each $myClassesState.getDedicatedClass ?? [] as getDedicatedClass, index }
                <tr class="bg-white">
                
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <button title="Click to view details of {getDedicatedClass.created_class_tb.class_name}" class="font-bold text-blue-500 hover:underline transition-all active:scale-95"
                        
                        >{getDedicatedClass.created_class_tb.class_name}</button>
                    </td>
                
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {getDedicatedClass.created_class_tb.class_details}
                    </td>

                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span class="p-1.5 text-xs font-medium tracking-wider text-red-500 bg-opacity-50">{getDedicatedClass.class_code}</span>
                    </td>

                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">0</td>
                </tr>
                
    
            {/each}
        
        </tbody>
    </table>
</div>