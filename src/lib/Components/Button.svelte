<script lang="ts">
	import type { Placement } from "@floating-ui/dom";
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";

    export let name = "button name";
    export let loader = false;
    export let loader_name = "loader name";
    export let style = "bg-green-500 p-2 rounded-lg text-sm";
    export let type: "button" | "submit" | "reset" | null | undefined = "submit";
    export let title = "";

</script>
<!--
    @component
    @name: "Button"
    @loader: false
    @style: "bg-green-500 p-2 rounded-lg text-sm"
    @type: "button" | "submit" | "reset" | null | undefined = "button"
    @title: ""
    
-->

<button class="{style} transition-all active:bg-opacity-50 {loader ? "cursor-progress" : "" }"
{title}
{type} 
disabled={loader}
on:click
>
    {#if loader}
        <div class="flex gap-1 items-center justify-center">
            <span class="ml-2 truncate">{loader_name}</span>
            <div class="w-4 h-4 border-2 border-b-green-500 animate-spin rounded-full"></div>
            
        </div>
    {:else}
        <span class="truncate">{name}</span>
    {/if}

</button>