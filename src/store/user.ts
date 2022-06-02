import { writable } from 'svelte/store'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import notifyErrors from 'src/helpers/notify-errors'

type User = {
  name: string,
  authenticated: boolean
}

export const user = writable<User | undefined>()

const auth = getAuth()
onAuthStateChanged(auth, async _user => {
  if (_user) {
    user.set({
      name: localStorage.getItem('userName'),
      authenticated: true
    })
  } else {
    user.set({
      name: localStorage.getItem('userName'),
      authenticated: false
    })
  }
})

export async function signIn (email: string, password: string, name?: string, displayErrorOn?: string) {
  try {
    localStorage.setItem('userName', name)
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    notifyErrors(error, displayErrorOn)
  }
}