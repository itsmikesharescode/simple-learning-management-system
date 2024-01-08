<script lang="ts">
	import Nav from "$lib/Components/Nav.svelte";
	import { onMount } from "svelte";
    import { navState } from "$lib";
	import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;

    const { session } = data;

    onMount(() => {
        if(session){
            const { user: { user_metadata: { role } } } = session;
            if(role === "Teacher") $navState.defaultNav = $navState.teacherNav;
            else if(role === "Learner") $navState.defaultNav = $navState.learnerNav;
        }
        
    });

</script>

<Nav />

<div class="">
    <slot />
</div>