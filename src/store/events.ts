import { writable } from 'svelte/store'
import { appCollection } from './firebase'

export interface DatalayerEvent {
  event: 'imPageView' | 'imAnalyticsEvent'
  [key: string]: any
}

export const events = writable<Record<string, DatalayerEvent>>({})

export interface SelectedEvent {
  name: string
  data?: DatalayerEvent
}

export const selectedEvent = writable<SelectedEvent>({
  name: '',
})

const firebaseEvents = appCollection<DatalayerEvent>('events')

firebaseEvents.listen(docs => {
  if (docs) {
    events.set(docs)
  }
})

export function updateEvent (key: string, event: DatalayerEvent) {
  return firebaseEvents.update(key, event)
}

export function removeEvent (key: string) {
  return firebaseEvents.remove(key)
}