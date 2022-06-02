import { getFirestore, onSnapshot, doc, setDoc } from 'firebase/firestore'
import { writable } from 'svelte/store'
import { user } from './user'

const db = getFirestore()

const COLLECTION_NAME = 'builder'

export function appCollection <T>(name: string, defaultValue?: T) {
  const value = writable<T>(defaultValue)

  let allowWriteToDB = false

  const unsubscribe = user.subscribe(u => {
    if (u) {
      unsubscribe()
      value.subscribe(v => {
        if (allowWriteToDB) {
          setDoc(doc(db, COLLECTION_NAME, name), { data: v })
        }
        allowWriteToDB = true
      })
      onSnapshot(doc(db, COLLECTION_NAME, name), d => {
        const Raw = d.data()
        if (Raw) {
          allowWriteToDB = false
          value.set(Raw.data)
        }
      })
    }
  })
  return value
}