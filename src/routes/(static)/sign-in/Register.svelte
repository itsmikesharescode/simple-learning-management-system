<script lang="ts">
	import Button from "$lib/Components/Button.svelte";
	import { scale } from "svelte/transition";


</script>

<div class="min-h-[100dvh] flex justify-center items-center" in:scale>

    <div class="flex flex-col gap-2 w-[350px]">

        <h1 class="h1 text-center">Sign up</h1>
        <span class="text-center text-xs opacity-50 font-bold">Sign up to Learning System Management</span>

        <label>
            <span class="font-bold">Who are you:</span>
            <select class="select">
                <option>Learner</option>
                <option>Teacher</option>
            </select>
        </label>

        <label>
            <span class="font-bold">First Name:</span>
            <input type="text" class="input p-2" />
        </label>

        <label>
            <span class="font-bold">Middle Name:</span>
            <input type="text" class="input p-2" />
        </label>

        <label>
            <span class="font-bold">Last Name:</span>
            <input type="text" class="input p-2" />
        </label>

        <label>
            <span class="font-bold">Email:</span>
            <input type="email" class="input p-2" />
        </label>

        <label>
            <span class="font-bold">Password:</span>
            <input type="password" class="input p-2" />
        </label>

        <label>
            <span class="font-bold">Confirm Password:</span>
            <input type="password" class="input p-2" />
        </label>

        <Button style="w-full bg-green-500 p-2 rounded-3xl input text-white" name="Create Account"/>

        <p class="text-center mt-5">Already a member? <a href="/sign-in" class="text-center mt-5 text-blue-500 underline">Sign in</a></p>
    </div>

</div>