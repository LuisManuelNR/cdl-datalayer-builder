<script lang="ts">
  import { metadata } from 'src/store/metadatos'
  import Meta from './Meta.svelte'

  export let value: Record<number, string> = {}
</script>

{#if value}
  <div class="editable-metas">
    {#each $metadata as meta, i}
      <Meta meta={meta} editable bind:value={value[i]} />
    {/each}
  </div>
{/if}

<style>
  .editable-metas {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
  }
</style>