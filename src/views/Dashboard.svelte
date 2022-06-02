<script>
  import Nav from 'src/components/Nav.svelte'
  import EventEditor from 'src/components/EventEditor.svelte'
  import MetaDataEditor from 'src/components/MetaDataEditor.svelte'
</script>

<Nav />
<main class="mt-2">
  <MetaDataEditor />
  <EventEditor />
</main>