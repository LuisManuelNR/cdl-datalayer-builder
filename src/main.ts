// import App from './App.svelte'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCjvO0vkfs_-gPRbMMsMDFlBcC5cbgQ480',
  authDomain: 'cdl-datalayer-builder.firebaseapp.com',
  databaseURL: 'https://cdl-datalayer-builder-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'cdl-datalayer-builder',
  storageBucket: 'cdl-datalayer-builder.appspot.com',
  messagingSenderId: '778146016514',
  appId: '1:778146016514:web:e1076826c0b8569b1fa61b'
}

async function startApp () {
  initializeApp(firebaseConfig)
  const App = (await import('./App.svelte')).default
  new App({
    target: document.getElementById('app')
  })
}

startApp()
