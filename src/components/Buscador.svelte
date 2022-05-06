<script lang="ts">
  import { CInput } from 'chasi-lib'
  let value = ''
</script>

<div class="buscador">
  <CInput value={value} label="Filtrar evento">
    <input bind:value={value}>
  </CInput>
</div>

<style>
  .buscador {
    --surface-2: #2f353c;
  }
</style>