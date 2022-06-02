<script lang="ts">
  import { CInput, CForm } from 'chasi-lib'
  import { required, validEmail } from 'src/helpers/form-rules'
  import { signIn } from 'src/store/user'
  let email = ''
  let password = ''
  let loading = false

  async function onSubmit () {
    loading = true
    await signIn(email, password, '#login-form-errors')
    loading = false
  }
</script>

<div class="login-page">
  <div class="c-card surface-3">
    <h1>LOGEATE!!!!!</h1>
    <CForm on:submit={onSubmit}>
      <CInput label="Email" value={email} rules={[required, validEmail]}>
        <input type="email" bind:value={email} >
      </CInput>
      <CInput label="Password" value={email} rules={[required]}>
        <input type="password" bind:value={password}>
      </CInput>
      <div id="login-form-errors" class="mt-1"></div>
      <button class="c-btn block primary" class:loading type="submit">
        Entrar
      </button>
    </CForm>
  </div>
</div>

<style>
  .login-page {
    display: grid;
    place-content: center;
    min-height: 100%;
    grid-template-columns: minmax(auto, 450px);
  }
</style>