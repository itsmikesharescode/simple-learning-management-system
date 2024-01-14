<script lang="ts">
    import {createQuizState} from "$lib"; 
    import Button from "$lib/Components/Button.svelte";
	import { scale } from "svelte/transition";

    const fireIfReady = () =>
    {

    }


</script>


{#if $createQuizState.showCreateQuiz}
    <div class="fixed left-0 right-0 top-0 bottom-0 bg-[#00000050] p-2">

        <div class="mx-auto sm:max-w-xl mt-[10dvh] text-black" in:scale>
            <h3 class="h3 text-center p-2 bg-white rounded-t-lg">Create Quiz</h3>

            <div class="bg-slate-200 rounded-b-lg p-4 flex flex-col gap-2">
                <div class="flex justify-end">
                    <span class="text-sm font-bold bg-green-500 text-white px-2 rounded-xl">Page 1</span>
                </div>

                <label>
                    <p class="text-sm">Question: </p>
                    <input type="text" class="input p-2 text-sm rounded-lg" />
                </label>

                <label>
                    <p class="text-sm">Selection One: </p>
                    <input type="text" class="input p-2 text-sm rounded-lg" />
                </label>

                <label>
                    <p class="text-sm">Selection Two: </p>
                    <input type="text" class="input p-2 text-sm rounded-lg" />
                </label>

                <label>
                    <p class="text-sm">Selection Three: </p>
                    <input type="text" class="input p-2 text-sm rounded-lg" />
                </label>

                <label>
                    <p class="text-sm">Selection Four: </p>
                    <input type="text" class="input p-2 text-sm rounded-lg" />
                </label>

                <label>
                    <p class="text-sm">Select Right Answer:</p>
                    <select class="select p-2 text-sm rounded-lg">
                        <option>Selection One</option>
                        <option>Selection Two</option>
                        <option>Selection Three</option>
                        <option>Selection Four</option>
                    </select>
                </label>

                <div class="flex gap-2 items-center mt-5">
                    <div class="w-full">
                        <Button title="Click, to back." style="bg-green-500 p-2 rounded-lg text-sm text-white font-bold" name="Back" on:click={() => $createQuizState.showCreateQuiz = false} />
                    </div>
                   
                    <div class="flex gap-2 items-center">
                        <Button title="Click, to proceed." style="bg-red-500 p-2 rounded-lg text-sm text-white font-bold" name="Undo" />
                        <Button title="Click, to proceed." style="bg-green-500 p-2 rounded-lg text-sm text-white font-bold" name="Next" />
                        <Button title="Click, to proceed." style="bg-green-500 p-2 rounded-lg text-sm text-white font-bold" name="Submit" />
                    </div>
                </div>
                
            </div>

            
        </div>
        
    </div>
{/if}

