<script lang="ts">
  import { CNav, CIcon, CDialog, CInput } from 'chasi-lib'
  import { mdiPlus, mdiMenu } from '@mdi/js'
  import Buscador from 'src/components/Buscador.svelte'
  import { events, selectedEvent, updateEvent } from 'src/store/events'

  let visibleNav = false

  let addDialog = false
  let newEventName = ''

  let loading = false
  async function _addEvent () {
    loading = true
    await updateEvent(newEventName, {
      event: 'imPageView'
    })
    loading = false
    addDialog = false
    newEventName = ''
  }
</script>

<CNav app width="320px" bind:visible={visibleNav}>
  <div slot="prepend" class="pa-2">
    <div class="c-flex align-center justify-between">
      <h4 class="text-s5">Eventos</h4>
      <CDialog bind:visible={addDialog} persistent width=450px>
        <div class="c-card surface-1" class:loading>
          <p class="text-s5">Nuevo Evento</p>
          <CInput value={newEventName} label="Nombre del evento">
            <input bind:value={newEventName} >
          </CInput>
          <div class="c-flex justify-between">
            <button class="c-btn text" on:click={() => addDialog = false}>
              Cancelar
            </button>
            <button class="c-btn text primary-text" on:click={_addEvent}>
              Añadir
            </button>
          </div>
        </div>
        <button slot="action" class="c-btn icon primary" on:click={() => addDialog = true}>
          <CIcon icon={mdiPlus} />
        </button>
      </CDialog>
    </div>
    <Buscador />
  </div>

  <div class="pa-2">
    {#each Object.keys($events) as key}
      <div 
        class="c-selectable mb-1 surface-3"
        class:selected={$selectedEvent.name === key}
        on:click={() => $selectedEvent = { name: key, data: $events[key] }}
      >
        <div>
          <p>{key}</p>
          <p class="text-s2 text-2">({$events[key].event})</p>
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