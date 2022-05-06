<script lang="ts">
  import { CApp } from 'chasi-lib'
  import Nav from 'src/components/Nav.svelte'
  import EventEditor from './components/EventEditor.svelte'
</script>

<CApp class="dark">
  <Nav />
  <main>
    <div class="c-flex align-center mt-4">
      <EventEditor></EventEditor>
    </div>
  </main>
</CApp>

<style>
  main {
    max-width: 1300px;
    margin: 0 auto;
  }
</style>