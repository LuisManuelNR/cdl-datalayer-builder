<script lang="ts">
  import { metadata } from 'src/store/metadatos'
  import Meta from './Meta.svelte'

  export let value: Record<string, any> = {}
</script>

{#if value}
  <div class="editable-metas">
    {#each Object.keys($metadata) as meta}
      <Meta meta={$metadata[meta]} key={meta} editable bind:value={value[meta]} />
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