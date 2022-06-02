<script lang="ts">
  import { CApp } from 'chasi-lib'
  import Nav from 'src/components/Nav.svelte'
  import EventEditor from 'src/components/EventEditor.svelte'
  import MetaDataEditor from 'src/components/MetaDataEditor.svelte'
  import Login from 'src/components/Login.svelte'
  import { user } from 'src/store/user'
</script>

<CApp class="dark">
  {#if $user === undefined}
    <div class="loading blank"></div>
  {:else if $user}
    <Nav />
    <main class="mt-2">
      <MetaDataEditor />
      <EventEditor />
    </main>
  {:else}
    <Login />
  {/if}
</CApp>

<style>
  .blank {
    height: 100%;
  }
</style>