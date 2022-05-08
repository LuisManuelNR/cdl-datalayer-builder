<script lang="ts">
  import { CInput, CDialog } from 'chasi-lib'
  import { metadata } from 'src/store/metadatos'
  import Meta from './Meta.svelte'

  export let value: Record<string, any> = {}
</script>

{#if value}
  <div class="editable-metas">
    {#each Object.keys($metadata) as meta}
    <CDialog let:toggleDialog width=450px persistent>
      <div class="c-card surface-1">
        <CInput label={meta} value={value[meta]}>
          <input bind:value={value[meta]}>
        </CInput>
        <button class="c-btn text block primary-text" on:click={toggleDialog}>
          Guardar
        </button>
      </div>
      <div slot="action">
        <Meta meta={$metadata[meta]} key={meta} value={value[meta]} on:click={toggleDialog} />
      </div>
    </CDialog>
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