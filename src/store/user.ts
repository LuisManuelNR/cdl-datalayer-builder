import { writable } from 'svelte/store'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import notifyErrors from 'src/helpers/notify-errors'

export const user = writable<string | undefined | false>()

const auth = getAuth()

onAuthStateChanged(auth, _user => {
  if (_user) {
    user.set(_user.email)
  } else {
    user.set(false)
  }
})

export async function signIn (email: string, password: string, displayErrorOn?: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    notifyErrors(error, displayErrorOn)
  }
}