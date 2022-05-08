<script lang="ts">
  import { CNav, CIcon, CDialog, CInput, CSelect } from 'chasi-lib'
  import { mdiPlus, mdiMenu } from '@mdi/js'
  import Buscador from 'src/components/Buscador.svelte'
  import { events, selectedEventIndex, EVENTS_TYPES } from 'src/store/events'

  let visibleNav = false

  let addDialog = false
  let newEventName = ''
  let eventType = 'imPageView'

  async function _addEvent () {
    $events = [
      ...$events,
      {
        propName: newEventName,
        childrens: [
          {
            propName: 'event',
            value: eventType
          }
        ]
      },
    ]
    addDialog = false
    newEventName = ''
  }
</script>

<CNav app width="320px" bind:visible={visibleNav}>
  <div slot="prepend" class="pa-2">
    <div class="c-flex align-center justify-between">
      <h4 class="text-s5">Eventos</h4>
      <CDialog bind:visible={addDialog} persistent width=450px>
        <div class="c-card surface-1">
          <p class="text-s5">Nuevo Evento</p>
          <CInput value={newEventName} label="Nombre del evento">
            <input bind:value={newEventName} >
          </CInput>
          <CSelect label="Tipo de evento" items={EVENTS_TYPES} bind:value={eventType} />
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
    {#each $events as event, i}
      <div 
        class="c-selectable mb-1 surface-3"
        class:selected={$selectedEventIndex === i}
        on:click={() => $selectedEventIndex = i}
      >
        <div>
          <p>{event.propName}</p>
          <p class="text-s2 text-2">({event.childrens[0].value})</p>
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