<script lang="ts">
  import { CApp } from 'chasi-lib'
  import Nav from 'src/components/Nav.svelte'
  import EventEditor from 'src/components/EventEditor.svelte'
  import MetaDataEditor from 'src/components/MetaDataEditor.svelte'
</script>

<CApp class="dark">
  <Nav />
  <main class="mt-2">
    <MetaDataEditor />
    <div class="c-grid xs-2 mt-2">
      <EventEditor />
    </div>
  </main>
</CApp>