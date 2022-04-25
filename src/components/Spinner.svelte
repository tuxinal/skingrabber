<script lang="ts">
  export let color: string = "#FF3E00";
  export let size: number | string = 1;
</script>

<style>
  .circle {
    height: var(--size);
    width: var(--size);
    border-color: var(--color) transparent var(--color) var(--color);
    border-width: 2px;
    border-style: solid;
    border-image: initial;
    border-radius: 50%;
    animation: 0.75s linear 0s infinite normal none running rotate;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<div
  class="circle"
  style="--size: {size}em; --color: {color};" />
