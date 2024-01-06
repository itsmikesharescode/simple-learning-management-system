<script lang="ts">
	import Button from "$lib/Components/Button.svelte";
	import { scale } from "svelte/transition";


</script>

<div class="min-h-[100dvh] flex justify-center items-center" in:scale>

    <div class="flex flex-col gap-2 w-[350px]">

        <h1 class="h1 text-center">Sign in</h1>
        <span class="text-center text-xs opacity-50 font-bold">Sign in to Learning System Management</span>
        <label>
            <span class="font-bold">Email:</span>
            <input type="email" class="input p-2" />
        </label>

        <label>
            <span class="font-bold">Password:</span>
            <input type="password" class="input p-2" />
        </label>

        <Button style="w-full bg-green-500 p-2 rounded-3xl input text-white" name="Sign in"/>

        <a href="?forgot-pass" class="text-center mt-5 text-blue-500 underline">Forgot Password?</a>

        <p class="text-center mt-5">Not yet a member? <a href="?sign-up" class="text-center mt-5 text-blue-500 underline">Create account</a></p>
    </div>

</div>