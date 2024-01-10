<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/Components/Button.svelte";


	
</script>

<div class="flex flex-col justify-center min-h-[100dvh] p-5">
    <div class="mx-auto md:max-w-xl p-4 rounded-lg bg-[#fffffff1] text-black flex flex-col gap-5 ">
        <span class="flex flex-col gap-2 text-sm sm:text-base">
            <p>
                Hey there, learner! Hey there, teacher! 
                Welcome to Simple Learning Management System, your friendly neighborhood learning haven. We believe education should be accessible, engaging, and empowering for everyone. 
            </p>
            
            <p>
                That's why we created a platform where teachers can unleash their inner rockstars, building vibrant classrooms filled with interactive content and personalized learning paths. 
            </p>

            <p>
                And for students? Well, buckle up for a learning roller coaster! Dive into diverse courses, conquer challenges, and connect with a community of fellow knowledge seekers.
            </p>

            <p>
                Let's unlock your potential and make learning an adventure together. Join and learn today!
            </p>
        </span>
        
        
        <Button title="Click, to proceed!" style="bg-green-500 p-2 w-full sm:w-[50%] mx-auto rounded-lg text-sm text-white font-bold" name="Let's go!" on:click={() => goto("/sign-in")} />
        
    </div>
</div>

