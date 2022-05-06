<script lang="ts">
  import { CNav, CIcon, CDialog, CInput } from 'chasi-lib'
  import { mdiPlus, mdiMenu } from '@mdi/js'
  import Buscador from 'src/components/Buscador.svelte'
  import { events, selectEvent } from 'src/store'

  let visibleNav = false
</script>

<CNav app width="320px" bind:visible={visibleNav}>
  <div slot="prepend" class="pa-2">
    <div class="c-flex align-center justify-between">
      <h4 class="text-s5">Eventos</h4>
      <CDialog let:toggleDialog width=450px>
        <div class="c-card surface-1">
          <p class="text-s5">Nuevo Evento</p>
        </div>
        <button slot="action" class="c-btn icon primary" on:click={toggleDialog}>
          <CIcon icon={mdiPlus} />
        </button>
      </CDialog>
    </div>
    <Buscador />
  </div>

  <div class="pa-2">
    {#each $events as event}
      <div 
        class="c-selectable mb-1 surface-3"
        on:click={() => selectEvent(event)}
      >
        <div>
          <p>{event.name}</p>
          <p class="text-s2 text-2">({event.data.event})</p>
        </div>
      </div>
    {/each}
  </div>
</CNav>

<div class="nav-activator">
  <button class="c-btn icon primary" on:click={() => visibleNav = true}>
    <CIcon icon={mdiMenu} />
  </button>
</div>

<style lang="scss">
  @use 'chasi-lib/CApp/breakpoints' as breakpoints;
  .nav-activator {
    position: fixed;
    bottom: 1.5rem;
    left: 1.5rem;
  }
  @media only screen and (min-width: breakpoints.$md) {
    .nav-activator {
      display: none;
    }
  }
</style>