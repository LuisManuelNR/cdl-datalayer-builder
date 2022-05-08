<script lang="ts">
  import { CIcon, CDialog, CInput, CForm } from 'chasi-lib'
  import { mdiPlus } from '@mdi/js'
  import Meta from './Meta.svelte'
  import { metadata, updateMeta } from 'src/store/metadatos'
  import { required } from 'src/store/formRules'
  import type { Metadata } from 'src/store/metadatos'

  let metaKey = ''
  let metaModel: Metadata = {
    color: ''
  }
  let dialog = false
  let loading = false

  let isNewMeta = false
  function openDialog (key?: string) {
    if ($metadata[key]) {
      isNewMeta = false
      metaKey = key
      metaModel = $metadata[key]
    } else {
      isNewMeta = true
      metaKey = ''
      metaModel = {
        color: ''
      }
    }
    dialog = true
  }

  async function addOrUpdate () {
    loading = true
    await updateMeta(metaKey, metaModel)
    loading = false
    dialog = false
  }
</script>

<p class="text-s4">Metadatos disponibles</p>
<div class="c-flex align-center">
  {#each Object.keys($metadata) as meta}
    <Meta meta={$metadata[meta]} key={meta} on:click={() => openDialog(meta)} />
  {/each}
  <button class="c-btn text icon primary-text" on:click={() => openDialog()}>
    <CIcon icon={mdiPlus} />
  </button>
</div>

<CDialog bind:visible={dialog} persistent width="450px">
  <div class="c-card surface-1" class:loading>
    <CForm on:submit={addOrUpdate}>
      <CInput label="Nombre" value={metaKey} rules={[required]}>
        <input bind:value={metaKey} disabled={!isNewMeta} >
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