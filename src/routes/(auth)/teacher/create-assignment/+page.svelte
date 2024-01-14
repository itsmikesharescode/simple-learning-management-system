<script lang="ts">
    import {navState, createAssignmentState} from "$lib";
    import {onMount} from "svelte";
    import Button from "$lib/Components/Button.svelte"

    onMount( () => {
        $navState.activeItem = "/teacher/create-assignment";
    })

</script>

<div class="p-2 md:max-w-[80dvw] mx-auto min-h-[100dvh] flex flex-col gap-3">
    <Button title="Click, to create class." 
    style="bg-green-500 max-w-fit p-2 rounded-lg text-white mt-[5dvh] text-sm font-bold" 
    name="Create Assignment" on:click={() => $createAssignmentState.showCreateAssignment = true}/>
</div>