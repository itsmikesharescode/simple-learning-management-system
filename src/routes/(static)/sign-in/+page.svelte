<script lang="ts">
    import { page } from "$app/stores";
	import ForgotPass from "./ForgotPass.svelte";
	import Login from "./Login.svelte";
	import Register from "./Register.svelte";

</script>

{#if $page.url.search === "?sign-up"}
    <Register />
{:else if $page.url.search === "?forgot-pass"}
    <ForgotPass />
{:else}
    <Login />
{/if}

