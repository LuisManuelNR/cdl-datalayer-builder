<script lang="ts">
  import type { Metadata } from 'src/store/metadatos'
  export let meta: Metadata
  export let value = ''
  export let editable = false

  function resizeInput (node: HTMLInputElement) {
    const resize = () => {
      if (node.value.length > 15) {
        node.style.width = node.value.length + 'ch'
      }
    }
    node.addEventListener('input', resize)
    return {
      destroy () {
        node.removeEventListener('input', resize)
      }
    }
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="meta" class:has-value={editable} style="--color: {meta.color};" on:click>
  <span>{meta.name}</span>
  {#if editable}
    <input use:resizeInput bind:value={value} placeholder="Escribe un valor">
  {/if}
</label>

<style lang="scss">
  .meta {
    background-color: var(--surface-4);
    color: var(--color);
    padding: 0 var(--size-2);
    border-radius: var(--size-1);
    margin: 0.2rem;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    text-align: center;
    input {
      color: inherit;
      text-align: inherit;
      resize: both;
      min-width: 100%;
      font-family: monospace;
    }
    span {
      white-space: nowrap;
    }
  }
  .has-value {
    cursor: auto;
    padding: var(--size-2);
    padding-bottom: 0;
    span {
      transform: scale(0.7);
      line-height: 0.2;
    }
  }
</style>