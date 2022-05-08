import { initializeApp } from 'firebase/app'
import { getFirestore, onSnapshot, doc, setDoc } from 'firebase/firestore'
import { writable } from 'svelte/store'

const firebaseConfig = {
  apiKey: 'AIzaSyCjvO0vkfs_-gPRbMMsMDFlBcC5cbgQ480',
  authDomain: 'cdl-datalayer-builder.firebaseapp.com',
  databaseURL: 'https://cdl-datalayer-builder-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'cdl-datalayer-builder',
  storageBucket: 'cdl-datalayer-builder.appspot.com',
  messagingSenderId: '778146016514',
  appId: '1:778146016514:web:e1076826c0b8569b1fa61b'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const COLLECTION_NAME = 'builder'

export function appCollection <T>(name: string, defaultValue?: T) {
  const value = writable<T>(defaultValue)

  let allowWriteToDB = false
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
  return value
}