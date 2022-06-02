<script lang="ts">
  import { CIcon, CDialog, CInput, CForm } from 'chasi-lib'
  import { mdiPlus } from '@mdi/js'
  import { required } from 'src/helpers/form-rules'
  import type { Metadata } from 'src/store/metadatos'
  import { metadata } from 'src/store/metadatos'
  import Meta from './Meta.svelte'

  let metaModel: Metadata = {
    name: '',
    color: ''
  }
  let dialog = false
  let isNewMeta = false
  let selectedIndex = -1

  function openDialog (index?: number) {
    if ($metadata[index]) {
      isNewMeta = false
      metaModel = $metadata[index]
      selectedIndex = index
    } else {
      isNewMeta = true
      metaModel = {
        name: '',
        color: ''
      }
    }
    dialog = true
  }

  async function addOrUpdate () {
    if (isNewMeta) {
      $metadata = [
        ...$metadata,
        metaModel
      ]
    } else if ($metadata[selectedIndex]) {
      $metadata[selectedIndex] = metaModel
    }
    dialog = false
    selectedIndex = -1
  }
</script>

<p class="text-s4">Metadatos disponibles</p>
<div class="c-flex align-center">
  {#each $metadata as meta, i}
    <Meta meta={meta} on:click={() => openDialog(i)} />
  {/each}
  <button class="c-btn text icon primary-text" on:click={() => openDialog()}>
    <CIcon icon={mdiPlus} />
  </button>
</div>

<CDialog bind:visible={dialog} persistent width="450px">
  <div class="c-card surface-1">
    <CForm on:submit={addOrUpdate}>
      <CInput label="Nombre" value={metaModel.name} rules={[required]}>
        <input bind:value={metaModel.name} disabled={!isNewMeta} >
      </CInput>
      <CInput label="Color" value={metaModel.color} rules={[required]}>
        <input type="color" bind:value={metaModel.color}>
      </CInput>
      <div class="c-flex justify-between">
        <button class="c-btn text" on:click={() => dialog = false}>
          Cancelar
        </button>
        <button class="c-btn text primary-text" type="submit">
          {isNewMeta ? 'Añadir' : 'Actualizar'}
        </button>
      </div>
    </CForm>
  </div>
</CDialog>