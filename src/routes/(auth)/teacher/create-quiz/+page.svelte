<script lang="ts">
    import {onMount} from "svelte";
    import {navState} from "$lib";
    import Button from "$lib/Components/Button.svelte";
    import CreateQuiz from "./CreateQuiz.svelte";
    import RenderLargerScreenQuiz from "./RenderLargerScreenQuiz.svelte";
    import {createQuizState} from "$lib";


    onMount( () => {
        $navState.activeItem = "/teacher/create-quiz"
    });

</script>

<CreateQuiz />

<div class="p-2 md:max-w-[80dvw] mx-auto min-h-[100dvh] flex flex-col gap-3">
    <Button title="Click, to create class." 
    style="bg-green-500 max-w-fit p-2 rounded-lg text-white mt-[5dvh] text-sm font-bold" 
    name="Create Quiz" on:click={() => $createQuizState.showCreateQuiz = true}/>

    <!--Desktop Screen-->
    <RenderLargerScreenQuiz />

</div>