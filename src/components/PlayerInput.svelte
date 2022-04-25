<script lang="ts">
	import { get_profile } from '../stores';
	import Spinner from './Spinner.svelte';
	import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte';
	import FaExclamationCircle from 'svelte-icons/fa/FaExclamationCircle.svelte';
	import FaSearch from 'svelte-icons/fa/FaSearch.svelte';
	enum State {
		Loading,
		Fail,
		Success
	}
	let state: State = null;
	function onsubmit() {
		let search_input: HTMLInputElement = document.getElementById(
			'search-input'
		) as HTMLInputElement;
		state = State.Loading;
		get_profile(search_input.value)
			.then(() => {
				state = State.Success;
			})
			.catch(() => {
				state = State.Fail;
			});
	}
</script>

<form on:submit|preventDefault={onsubmit} id="search-form">
	{#if state != null}
		<div id="search-status">
			{#if state == State.Loading}
				<Spinner color="#fff" />
			{:else if state == State.Success}
				<FaCheckCircle />
			{:else if state == State.Fail}
				<FaExclamationCircle />
			{/if}
		</div>
	{/if}
	<!-- svelte-ignore a11y-autofocus -->
	<input
		placeholder="Enter username or UUID"
		id="search-input"
		autofocus
		on:keydown={() => (state = null)}
	/>
	<button id="search-submit">
		<div style="height: 1.2em;">
			<FaSearch />
		</div>
	</button>
</form>

<style>
	#search-form {
		--height: 2.5em;
		border-color: rgba(255, 255, 255, 0.24);
		border-radius: 7px;
		border-style: solid;
		border-width: 1px;
		color: rgba(255, 255, 255, 0.92);
		height: var(--height);
		display: flex;
	}
	#search-input {
		width: 100%;
		border-radius: 7px;
		padding: 10px;
		background: inherit;
		border: none;
		color: inherit;
		box-sizing: border-box;
	}
	#search-input:focus {
		outline: none;
	}
	#search-submit {
		min-height: var(--height);
		min-width: var(--height);
		border-style: none;
		background-color: #3d4756;
		color: inherit;
		display: flex;
		border-radius: 7px;
		justify-content: center;
		align-items: center;
		transition: background-color 0.2s;
		cursor: pointer;
	}
	#search-submit:hover {
		background-color: #515e74;
	}
	#search-submit:active {
		background-color: #6d7f9b;
	}
	#search-status {
		align-self: center;
		display: flex;
		border-radius: 7px;
		justify-content: center;
		align-items: center;
		height: 1.2em;
		padding: 10px 0px 10px 10px;
	}
</style>
