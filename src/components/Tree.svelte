<script lang="ts">
  import { CInput, CIcon, CDialog } from 'chasi-lib'
  import {
    mdiPlus,
    mdiCloseCircleOutline
  } from '@mdi/js'
  import TreeValueEditor from './TreeValueEditor.svelte'
  import TreeOptions from './TreeOptions.svelte'
  import type { DatalayerEvent } from 'src/store/events'

  export let tree: DatalayerEvent[]
  export let parent: DatalayerEvent | undefined = undefined

  let newField = ''
  let newDialogVisible = false
  function addField() {
    tree = [
      ...tree,
      {
        propName: newField,
        isEdit: true
      }
    ]
    newDialogVisible = false
    newField = ''
  }

  let activeRemoveButton: DatalayerEvent | string | undefined = undefined

  function removeItem (index: number) {
    tree = tree.filter((v, i) => i !== index)
  }
</script>

{#if tree}
  <div class="tree">
    {#each tree as item, index}
      <div
        class="tree-item"
        class:is-meta={item.isMeta || item.isEdit}
      >
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <div
          class="key"
          on:mouseover={() => activeRemoveButton = item}
          on:mouseleave={() => activeRemoveButton = undefined}
        >
          {#if activeRemoveButton === item}
            <button on:click={() => removeItem(index)} class="c-btn icon text error-text remove-btn">
              <CIcon icon={mdiCloseCircleOutline} />
            </button>
          {/if}
          {item.propName}:
          {#if item.childrens}
            <span class:object={!item.isArray} class:array={item.isArray}>
              {item.isArray ? 'List' : 'Object'}
            </span>
          {/if}
        </div>
        {#if item.isEdit}
          <TreeOptions {index} bind:tree />
        {:else if item.isMeta}
          <TreeValueEditor bind:value={item.isMeta} />
        {:else if item.childrens}
          <svelte:self bind:tree={item.childrens} parent={item} />
        {:else if item.value}
          <span class="value">{item.value}</span>
        {/if}
      </div>
    {/each}
    <div class="tree-item action">
      <CDialog bind:visible={newDialogVisible} persistent width="450px">
        <div class="c-card surface-1">
          {#if parent.isArray}
            <button class="c-btn ">
              Añadir Valor
            </button>
          {/if}
          <CInput label="Nombre" value={newField}>
            <input bind:value={newField} />
          </CInput>
          <div class="c-flex justify-between">
            <button
              class="c-btn text"
              on:click={() => newDialogVisible = false}
            >
              Cancelar
            </button>
            <button class="c-btn text primary-text" on:click={addField}>
              Añadir
            </button>
          </div>
        </div>
        <div slot="action">
          {#if parent && parent.isArray}
            <TreeOptions index={tree.length} bind:tree={tree} />
          {:else}
            <button
              class="c-btn icon text success-text"
              on:click={() => newDialogVisible = true}
            >
              <CIcon icon={mdiPlus} />
            </button>
          {/if}
        </div>
      </CDialog>
    </div>
  </div>
{/if}

<style lang="scss">
  .tree {
    font-size: 1.4rem;
    font-family: monospace;
    --dashColor: var(--text-2);
    .action {
      --h: 50%;
    }
    .tree-item {
      position: relative;
      margin-left: var(--size-6);
      &::before {
        position: absolute;
        content: '';
        left: calc(var(--size-4) * -1);
        top: 0;
        height: var(--h, 100%);
        border-left: 2px dashed var(--dashColor);
      }
      &::after {
        position: absolute;
        content: '';
        top: var(--h, 1.7rem);
        left: calc(var(--size-4) * -1);
        width: var(--size-3);
        border-bottom: 2px dashed var(--dashColor);
      }
      &.is-meta {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
    .key {
      color: hsl(205deg 100% 83%);
      margin: 5px 0;
      display: inline-block;
      span {
        padding: var(--size-1);
        border-radius: var(--size-1);
        position: relative;
        &::before {
          position: absolute;
          background-color: currentColor;
          border-radius: inherit;
          content: '';
          opacity: .1;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
    :global(.value) {
      color: hsl(0deg 74% 71%);
    }
    :global(.array) {
      color: hsl(50deg 74% 71%);
    }
    :global(.object) {
      color: hsl(220deg 74% 71%);
    }

    .remove-btn {
      position: absolute;
      left: -47px;
      top: 5px;
      background-color: var(--surface-1);
      z-index: 1;
    }
  }
</style>
