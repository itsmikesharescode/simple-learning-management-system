<script lang="ts">
	import Button from "$lib/Components/Button.svelte";
	import { scale } from "svelte/transition";
   
						

</script>


			

<div class="min-h-[100dvh] flex justify-center items-center" in:scale>

    <div class="flex flex-col gap-2 w-[350px] bg-[#ffffffec] p-4 rounded-xl text-sm">
        

        <h3 class="h3 text-center">Forgot Password</h3>
        
        <span class="text-center text-xs opacity-50 font-bold">Password Recovery to Learning System Management</span>
        <label>
            <span class="font-bold">Email:</span>
            <input type="email" class="input p-2" placeholder="Enter your email address."/>
        </label>


        <Button title="Click, to send a password reset link." 
        style="w-full bg-green-500 p-2 rounded-3xl input text-white text-sm font-bold" 
        name="Send Password Reset"/>


        <p class="text-center mt-5">Already got your account? <a title="Click, to sign in." href="/sign-in" class="text-center mt-5 text-blue-500 underline">Sign in</a></p>

        <p class="text-xs text-center text-red-500 mt-5">We'll send a password reset link to your email. Please double-check that your account email is correct.</p>
    </div>

</div>