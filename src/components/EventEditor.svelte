<script lang="ts">
  import { selectedEvent } from 'src/store/events'
  import Tree from './Tree.svelte'
</script>

{#if $selectedEvent}
  <div class="editor">
    <h3>{$selectedEvent.name}</h3>
    <Tree bind:tree={$selectedEvent.data}></Tree>
  </div>
{:else}
  <div>Seleccione un evento para inspeccionarlo</div>
{/if}

<style>
  .editor {
    overflow: auto;
    min-height: 75vh;
  }
</style>