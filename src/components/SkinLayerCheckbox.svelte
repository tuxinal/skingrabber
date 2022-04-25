<script lang="ts">
	import { current_skin } from '../stores';

	export let id: string;
	export let display_name: string;
	export let state: boolean;
	function change_layer_setting(event: Event) {
		let checkbox = event.target as HTMLInputElement;
		current_skin.update((skin) => {
			skin.skin_settings[checkbox.id] = checkbox.checked;
			return skin;
		});
	}
</script>

<div class="skinlayer-checkbox">
	<input type="checkbox" {id} checked={state} on:change={change_layer_setting} />
	<label for={id}>
		{display_name}
	</label>
</div>

<style>
	input {
		margin: 3px;
		cursor: pointer;
	}
</style>
