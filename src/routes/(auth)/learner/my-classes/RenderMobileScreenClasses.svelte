<script lang="ts">
    import { myClassesState } from "$lib";
	import Button from "$lib/Components/Button.svelte";


</script>



<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
    {#each $myClassesState.getDedicatedClass ?? [] as joinedClass, index }
        <div class="bg-white space-y-3 p-4 rounded-lg shadow flex flex-col gap-2">

            <div class="text-sm font-bold">
                <span>{joinedClass.created_class_tb.class_name}</span>
            </div>

            <div class="text-sm">
                <span>{joinedClass.created_class_tb.class_details}</span>
            </div>

            <div class="flex items-center space-x-2 text-sm">
                
                <div class="flex truncate gap-2">
                <span> Enrolled:</span>
                    <p class="">0</p>
                </div>

                <div class="flex truncate gap-2">
                    <span>Enroll Code:</span>
                    <p class="text-red-500">{joinedClass.created_class_tb.class_code}</p>
                </div>

            </div>

            <Button title="Click, to view details" style="bg-blue-500 p-2 rounded-lg text-sm text-white font-bold" name="View Details"  />


        </div>
    {/each}
   
</div>