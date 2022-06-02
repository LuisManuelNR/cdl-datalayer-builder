<script lang="ts">
  import { CApp } from 'chasi-lib'
  import { user } from 'src/store/user'

  const views = [
    {
      component: () => import('./views/Dashboard.svelte')
    },
    {
      component: () => import('./views/Login.svelte')
    },
  ]

  let loading = true
  let currentView: number | undefined
  user.subscribe(u => {
    currentView = undefined
    loading = true
    if (u && u.authenticated) {
      currentView = 0
    } else if (u) {
      currentView = 1
    }
    loading = false
  })
</script>

<CApp class="dark {loading ? 'loading' : ''}">
  {#if currentView !== undefined}
    {#await views[currentView].component() then v}
      <svelte:component this={v.default} />
    {/await}
  {/if}
</CApp>