<script lang="ts">
  import { events, selectedEventIndex } from 'src/store/events'
  import Tree from './Tree.svelte'
</script>

{#if $events[$selectedEventIndex]}
  <div class="editor">
    <h3>{$events[$selectedEventIndex].propName}</h3>
    <Tree bind:tree={$events[$selectedEventIndex].childrens}></Tree>
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