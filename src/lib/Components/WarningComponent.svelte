<script lang="ts">
	import { enhance } from "$app/forms";
	import type { SubmitFunction } from "@sveltejs/kit";
	import Button from "./Button.svelte";
	import type { ServerNews } from "$lib/types";

    const submit: SubmitFunction = () => {
        return async ({ result, update }) => {
            const {status, } = result as ServerNews<any>
                
            switch (status) {
                case 200:
                    break;
                
                case 402:
                    break;
                
                case 403:
                    break;
                default:
                    break;
            };
            await update();
        };
    };

    let inputVal = "";

    let condition = "your condition";

    const listener = () =>
    {
        if(inputVal === condition) console.log("clear errors");
    }

</script>

<div class="fixed left-0 right-0 top-0 bottom-0 bg-[#00000050] p-2">
    <div class="min-h-[80dvh]  mx-auto md:max-w-xl flex items-center">

        <form method="POST" action="" enctype="multipart/form-data" use:enhance={submit} class="w-full">

            <div class="bg-red-600 rounded-t-lg p-2">
                <h3 class="h3 text-center text-white text-base">This action cannot be undone. Please confirm.</h3>
            </div>
            
            <div class="p-4 bg-white rounded-b-lg flex flex-col gap-2">
                <label>
                    <span class="flex gap-1 text-sm p-2">Write <p class="text-black font-bold bg-slate-300 px-2">{condition}</p> to confirm. </span>
                    <input name="" type="text" class="input rounded-lg p-2 text-sm {inputVal === condition ? "text-white bg-green-500" : "" }" bind:value={inputVal} on:keyup={listener} />
                    {#each [] ?? [] as err }
                        <p class="text-red-500 text-xs p-2">{err}</p>
                    {/each}
                    <p class="text-red-500 text-xs p-2">Your input does not match the instructions.</p>
                </label>

                <div class="flex justify-end gap-2">
                    <Button type="button" style= "w-full sm:w-fit text-white font-bold bg-green-500 p-2 rounded-lg text-sm" name="Cancel" on:click />

                    <Button style= "w-full sm:w-fit text-white font-bold bg-red-500 p-2 rounded-lg text-sm" name="Confirm" />
                </div>
            </div>

        </form>
    </div>
</div>