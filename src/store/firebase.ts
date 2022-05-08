// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { collection, getFirestore, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
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

export function appCollection <T>(name: string) {
  const collRef = collection(db, name)
  const listOfData: Record<string, T> = {}
  return {
    listen: (onChange: (documents: Record<string, T>) => void) => onSnapshot(collRef, document => {
      document.forEach(d => {
        listOfData[d.id] = d.data() as T
      })
      onChange(listOfData)
    }),
    update: async (key: string, document: T) => {
      await setDoc(doc(collRef, key), document)
    },
    remove: async (key: string) => {
      await deleteDoc(doc(collRef, key))
    }
  }
}