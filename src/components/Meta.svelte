<script lang="ts">
  import type { Metadata } from 'src/store/metadatos'
  export let meta: Metadata
  export let value = ''
  export let key = ''
</script>

<button class="c-btn meta" style="--color: {meta.color};" on:click>
  <span class:has-value={value}>{key}</span>
  {value || ''}
</button>

<style>
  .meta {
    background-color: var(--surface-4);
    color: var(--color);
    padding: var(--size-2);
    border-radius: var(--size-1);
    margin: 0.2rem;
    display: flex;
    flex-direction: column;
  }
  .has-value {
    transform: scale(0.7);
    line-height: 0.2;
  }
</style>