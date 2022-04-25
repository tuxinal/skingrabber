<script>
	// @ts-nocheck
	let buttonProps = {
		class: [$$restProps.class]
	};
</script>

<!-- this line gives an error -->
<button on:click on:mouseover on:focus on:mouseenter on:mouseleave {...buttonProps}>
	<slot />
</button>

<style>
	button {
		border-style: none;
		border-radius: 7px;
		font-family: 'Crete Round';
		padding: 12px;
		background-color: #414b5a;
		color: inherit;
		transition: background-color 0.3s;
		font-weight: 600;
		cursor: pointer;
	}
	button:hover {
		background-color: #515e74;
	}
	button:active {
		background-color: #6d7f9b;
	}
	.green {
		background-color: #38a169;
	}
</style>
