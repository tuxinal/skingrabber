<script>
	import { onMount } from 'svelte';
	import "normalize.css";
	import { get_profile } from '../stores';
	import Model from '../components/Model.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	onMount(() => {
		if (window.location.hash !== '') {
			get_profile(window.location.hash.substring(1));
		}
	});
</script>

<svelte:head>
	<title>Skingrabber</title>
	<style>
		body {
			background-color: #1a202c;
			font-family: 'Ubuntu', sans-serif;
		}
		html,
		body {
			height: 100%;
		}
	</style>
</svelte:head>

<div style="display:flex; height: 100%; align-items: center; ">
	<Sidebar />
	<div style="display: flex; justify-content: center; flex:2">
		<Model />
	</div>
</div>
