import { writable } from 'svelte/store'
import { appCollection } from './firebase'

export interface Metadata {
  color: string,
}
export const metadata = writable<Record<string, Metadata>>({})

const firebaseMetadata = appCollection<Metadata>('metadata')

firebaseMetadata.listen(docs => {
  if (docs) {
    metadata.set(docs)
  }
})

export function updateMeta (key: string, meta: Metadata) {
  return firebaseMetadata.update(key, meta)
}

export function removeMeta (key: string) {
  return firebaseMetadata.remove(key)
}