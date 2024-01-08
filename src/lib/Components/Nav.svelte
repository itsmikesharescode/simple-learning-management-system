<script lang="ts">
	import { enhance } from "$app/forms";
	import { navState } from "$lib";
	import type { SubmitFunction } from "@sveltejs/kit";
	import Button from "./Button.svelte";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import type { ServerNews } from "$lib/types";
	import { toast } from "$lib/Helpers/toast";
	import { goto } from "$app/navigation";

    const toastStore = getToastStore();

    let showMobileMenu = false;
    let logoutLoader = false;
   
    const signOutNews: SubmitFunction = () => {
        logoutLoader = true;
        return async ({ result, update }) => {
            const {status, data: {msg} } = result as ServerNews<{msg: string}>
                
            switch (status) {
                case 200:
                    toast(msg, false, toastStore);
                    $navState.session = null;
                    logoutLoader = false;
                    goto("/sign-in?thanks-for-using-this-system");
                    break;
                
                case 402:
                    toast(msg, true, toastStore);
                    logoutLoader = false;
                    break;
                
                default:
                    break;
            };
            await update();
        };
    };

</script>

<nav class="w-full bg-[#000000a6] p-2 ">
    
    <div class="text-white hidden md:flex mr-5 items-center">
        <div class="flex gap-2 w-full justify-center">
            {#each $navState.defaultNav as selection }
                <a href={selection.url} class="p-2 text-sm font-bold">{selection.title}</a>
            {/each}
        </div>

        <form method="POST" action="/sign-in?/signOut" enctype="multipart/form-data" use:enhance={signOutNews} class="w-full flex justify-end">
            <Button style="bg-red-500 p-2 rounded-lg text-sm font-bold" name="Logout" loader={logoutLoader} loader_name="Logging out.." />
        </form>

    </div>

    <div class="flex flex-row-reverse md:hidden">
        <button class="p-2 flex flex-col gap-1" on:click={() => showMobileMenu = true}>
            <div class="w-6 border-b-2 border-white"></div>
            <div class="w-6 border-b-2 border-white"></div>
            <div class="w-6 border-b-2 border-white"></div>
        </button>
    </div>

    

</nav>

{#if showMobileMenu}

    <menu class="fixed left-0 right-0 top-0 bottom-0 bg-[#00000050] md:hidden">
        

        <div class="bg-[#574E4C] flex flex-col gap-2 text-white p-4">

            <div class="flex flex-row-reverse">
                <button class="px-2 py-4 flex flex-col gap-1" on:click={() => showMobileMenu = false}>
                    <div class="w-6 border-b-2 border-white rotate-45 absolute"></div>
                    <div class="w-6 border-b-2 border-white rotate-[-45deg]"></div>
                </button>
            </div>

            <div class="flex flex-col gap-2 justify-center items-center p-2">
                {#each $navState.defaultNav as selection }
                    <a href={selection.url} class="p-2 text-lg">{selection.title}</a>
                {/each}
            </div>
            
            <form method="POST" action="/sign-in?/signOut" enctype="multipart/form-data" use:enhance={signOutNews} class="my-5 w-fit mx-auto">
                <Button style="bg-red-500 p-2 rounded-lg" name="Logout" />
            </form>
        </div>

        
    </menu>

{/if}