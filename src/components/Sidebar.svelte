<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import PlayerInput from './PlayerInput.svelte';
	import Button from './Button.svelte';
	import { current_skin, type SkinSettings } from '../stores';
	import SkinLayerCheckbox from './SkinLayerCheckbox.svelte';
	let ready = false;
	onMount(() => {
		ready = true;
	});
</script>

<!--make sure the transition runs upon page loading-->
{#if ready}
	<div class="sidebar" transition:fly={{ x: -300, duration: 500, easing: cubicOut, opacity: 0.5 }}>
		<div>
			<h2>Skin Grabber</h2>
			<PlayerInput />
			{#if $current_skin !== null}
				<h3>{$current_skin.name}</h3>
				UUID: {$current_skin.uuid}
				<hr />
				<h4>Name history</h4>
				<ol reversed>
					{#each $current_skin.username_history.slice(0).reverse() as history_item, index}
						<li style="padding-bottom: 10px;">
							<b>{history_item.username}</b>
							{#if index == 0}
								(current)
							{/if}
							<br />
							{history_item.changed_at !== undefined
								? `Changed at: ${new Date(history_item.changed_at).toISOString().split('T')[0]}`
								: 'Original name'}
						</li>
					{/each}
				</ol>
				<hr />
				<h4>Skin layers</h4>
				<div id="skin-layers-form">
					<SkinLayerCheckbox display_name="Hat" id="hat" state={$current_skin.skin_settings.hat} />
					<SkinLayerCheckbox
						display_name="Jacket"
						id="jacket"
						state={$current_skin.skin_settings.jacket}
					/>
					<SkinLayerCheckbox
						display_name="Right Sleeve"
						id="rightSleeve"
						state={$current_skin.skin_settings.rightSleeve}
					/>
					<SkinLayerCheckbox
						display_name="Left Sleeve"
						id="leftSleeve"
						state={$current_skin.skin_settings.leftSleeve}
					/>
					<SkinLayerCheckbox
						display_name="Right Pant"
						id="rightPant"
						state={$current_skin.skin_settings.rightPant}
					/>
					<SkinLayerCheckbox
						display_name="Left Pant"
						id="leftPant"
						state={$current_skin.skin_settings.leftPant}
					/>
					<SkinLayerCheckbox
						display_name="Cape"
						id="cape"
						state={$current_skin.skin_settings.cape}
					/>
				</div>
				<hr />
				<div>
					<!-- download links have to be from the same origin -->
					<!-- here we use the base64 version to avoid that requirement -->
					<a href={$current_skin.skin} download="{$current_skin.name}.png">
						<Button class="green">Download</Button>
					</a>
					<a
						href="https://www.minecraft.net/profile/skin/remote?url={$current_skin.skin_url}&model={$current_skin.model ===
						'default'
							? 'classic'
							: 'slim'}"
					>
						<Button>Apply</Button>
					</a>
				</div>
			{/if}
		</div>
		<div
			style="height:100vh; display:flex; align-items:flex-end; justify-content: center; margin-top: 5px"
		>
			<div style="color: rgba(255, 255, 255, 0.5); font-size: smaller; text-align: center;">
				made with svelte and ♥ <br />
				<a href="https://github.com/tuxinal/skingrabber">source</a>
			</div>
		</div>
	</div>
{/if}

<style>
	a {
		color: inherit;
	}
	hr {
		width: 100%;
		color: rgba(255, 255, 255, 0.1);
	}
	ol {
		padding-left: 0px;
	}
	h2,
	h3,
	h4 {
		font-family: 'Crete Round', serif;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.sidebar {
		box-sizing: border-box;
		padding: 25px 25px 5px 25px;
		background-color: #2d3748;
		color: white;
		height: 100%;
		width: 25%;
		border-top-right-radius: 25px;
		border-bottom-right-radius: 25px;
		overflow-y: auto;
		display: flex;
		flex-flow: column;
	}
	#skin-layers-form {
		display: inline-grid;
		grid-template-columns: auto auto;
		width: 100%;
	}
</style>
