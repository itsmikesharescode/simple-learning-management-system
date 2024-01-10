<script lang="ts">
	import { enhance } from "$app/forms";
	import { myClassesState, navState } from "$lib";
	import Button from "$lib/Components/Button.svelte";
	import { encryptMessage } from "$lib/Helpers/clientEncryption";
	import type { JoinedAndCreatedClassTB, LearnersType, ServerNews } from "$lib/types";
	import { getToastStore } from "@skeletonlabs/skeleton";
	import type { Session } from "@supabase/supabase-js";
	import type { SubmitFunction } from "@sveltejs/kit";
	import { scale } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	import { toast } from "$lib/Helpers/toast";

	const toastStore = getToastStore();
	
	export let enrolledLearner: LearnersType;

	let inputVal = "";

	let condition = "Withdraw this class.";

	let showWithdraw = false;

	const listener = () =>
	{
		if(inputVal === condition) console.log("clear errors");
	};

	type WithdrawError = {
		confirm: string[]
	};

	type WithdrawNews = {
		session: Session
		msg: string
		enrolledLearners: LearnersType[]
		getDedicatedClass: JoinedAndCreatedClassTB[]
		errors: WithdrawError
	}

	let inputErrors: WithdrawError | null = null;

	let withdrawLoader = false;

	const dispatch = createEventDispatcher();

	const withdrawNews: SubmitFunction = () => 
	{
		withdrawLoader = true;

		return async ({ result, update }) => 
		{
			const {status, data: {session, msg, enrolledLearners, getDedicatedClass, errors}} = result as ServerNews<WithdrawNews>;
				
			switch (status) {
				case 200:
					$navState.session = session;
					$myClassesState.getDedicatedClass = getDedicatedClass;
					dispatch("updateEnrolledLearners", enrolledLearners);
					toast(msg, false, toastStore);
					withdrawLoader = false;
					showWithdraw = false;
					break;
				
				case 402:
					toast(msg, true, toastStore);
					withdrawLoader = false;
					break;
				
				case 403:
					inputErrors = errors;
					withdrawLoader = false;
					break;

				default:
					break;
			};
			await update();
		};
	};

	let learnerRef = encryptMessage(JSON.stringify({id: enrolledLearner.id, classCode: enrolledLearner.class_code}));

</script>

{#if showWithdraw}
	<div class="fixed left-0 right-0 top-0 bottom-0 bg-[#00000050] p-2">
		<div class="min-h-[80dvh]  mx-auto md:max-w-xl flex items-center" in:scale>

			<form method="POST" action="?/withdrawClass" enctype="multipart/form-data" use:enhance={withdrawNews} class="w-full">

				<div class="bg-red-600 rounded-t-lg p-2">
					<h3 class="h3 text-center text-white text-base">This action cannot be undone. Please confirm.</h3>
				</div>
				
				<div class="p-4 bg-white rounded-b-lg flex flex-col gap-2">
					<label>
						<span class="flex gap-1 text-sm p-2">Write <p class="text-black font-bold bg-slate-300 px-2">{condition}</p> to confirm. </span>
						<input name="confirm" type="text" class="input rounded-lg p-2 text-sm {inputVal === condition ? "text-white bg-green-500" : "" }" bind:value={inputVal} on:keyup={listener} />
						{#each inputErrors?.confirm ?? [] as err }
							<p class="text-red-500 text-xs p-2">{err}</p>
						{/each}
					</label>

					<div class="flex justify-end gap-2">
						<Button type="button" style= "w-full sm:w-fit text-white font-bold bg-green-500 p-2 rounded-lg text-sm" name="Cancel" on:click={() => showWithdraw = false} />

						<Button style= "w-full sm:w-fit text-white font-bold bg-red-500 p-2 rounded-lg text-sm" 
						name="Confirm" loader={withdrawLoader} 
						loader_name="Withdrawing.." />
					</div>
				</div>

				<input name="learnerRef" type="hidden" class="hidden" value={learnerRef} />

			</form>
		</div>
	</div>
{/if}

<Button title="Click, to withdraw in this class." style="bg-red-500 px-2 py-[0.3rem] rounded-lg text-sm text-white font-bold" 
name="Withdraw" on:click={() => showWithdraw = true} />