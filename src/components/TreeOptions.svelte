<script lang="ts">
import type { DatalayerEvent } from 'src/store/events'
import { CIcon } from 'chasi-lib'
import {
  mdiCodeBrackets,
  mdiCodeBraces,
  mdiPencil
} from '@mdi/js'

export let tree: DatalayerEvent[]
export let index: number
// export let isInArray = false

function toObject () {
  tree[index] = {
    propName: tree[index]?.propName || '',
    childrens: []
  }
}
function toArray () {
  tree[index] = {
    propName: tree[index]?.propName || '',
    childrens: [],
    isArray: true
  }
}
function toValue () {
  tree[index] = {
    propName: tree[index]?.propName || '',
    isMeta: {}
  }
}
</script>

<button
  class="c-btn icon text object"
  on:click={toObject}
>
  <CIcon icon={mdiCodeBraces} />
</button>
<button
  class="c-btn icon text array"
  on:click={toArray}
>
  <CIcon icon={mdiCodeBrackets} />
</button>
<button
  class="c-btn icon text success-text"
  on:click={toValue}
>
  <CIcon icon={mdiPencil} />
</button>