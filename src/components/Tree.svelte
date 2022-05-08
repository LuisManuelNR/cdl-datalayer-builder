<script lang="ts">
  import { CInput, CIcon, CDialog } from 'chasi-lib'
  import {
    mdiPlus,
    mdiCodeBrackets,
    mdiCodeBraces,
    mdiPencil,
  } from '@mdi/js'
  import TreeValueEditor from './TreeValueEditor.svelte'

  export let tree: Record<string, any>

  let newField = ''
  let newDialogVisible = false
  function addField() {
    tree = {
      ...tree,
      [newField]: { isEdit: {} },
    }
    newDialogVisible = false
    newField = ''
  }
</script>

{#if tree}
  <div class="tree">
    {#each Object.keys(tree) as treeKey}
      <div
        class="tree-item"
        class:is-value={typeof tree[treeKey] === 'object' &&
          'isValue' in tree[treeKey]}
      >
        <span class="key">{treeKey}:</span>
        {#if typeof tree[treeKey] === 'object' && 'isEdit' in tree[treeKey]}
          <button
            class="c-btn icon text success-text"
            on:click={() => (tree[treeKey] = {})}
          >
            <CIcon icon={mdiCodeBraces} />
          </button>
          <button
            class="c-btn icon text success-text"
            on:click={() => (tree[treeKey] = { isArray: {} })}
          >
            <CIcon icon={mdiCodeBrackets} />
          </button>
          <button
            class="c-btn icon text success-text"
            on:click={() => (tree[treeKey] = { isValue: {} })}
          >
            <CIcon icon={mdiPencil} />
          </button>
        {:else if typeof tree[treeKey] === 'object' && 'isValue' in tree[treeKey]}
          <TreeValueEditor bind:value={tree[treeKey].isValue} />
        {:else if typeof tree[treeKey] === 'object' && 'isArray' in tree[treeKey]}
          [ <svelte:self bind:tree={tree[treeKey].isArray} /> ]
        {:else if typeof tree[treeKey] === 'object' && tree[treeKey] !== null}
          &lcub; <svelte:self bind:tree={tree[treeKey]} /> &rcub;
        {:else}
          <span class="value">{tree[treeKey]}</span>
        {/if}
      </div>
    {/each}
    <div class="tree-item action">
      <CDialog bind:visible={newDialogVisible} persistent width="450px">
        <div class="c-card surface-1">
          <CInput label="Nombre" value={newField}>
            <input bind:value={newField} />
          </CInput>
          <div class="c-flex justify-between">
            <button
              class="c-btn text"
              on:click={() => (newDialogVisible = false)}
            >
              Cancelar
            </button>
            <button class="c-btn text primary-text" on:click={addField}>
              Añadir
            </button>
          </div>
        </div>
        <button
          slot="action"
          class="c-btn icon text success-text"
          on:click={() => (newDialogVisible = true)}
        >
          <CIcon icon={mdiPlus} />
        </button>
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
        top: var(--h, 2rem);
        left: calc(var(--size-4) * -1);
        width: var(--size-3);
        border-bottom: 2px dashed var(--dashColor);
      }
      :hover {
        --dashColor: var(--primary);
      }
      &.is-value {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
    .key {
      color: hsl(205deg 100% 83%);
      margin-top: 11px;
      display: inline-block;
    }
    .value {
      color: hsl(0deg 74% 71%);
    }
  }
</style>
