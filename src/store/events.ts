import { writable } from 'svelte/store'
import { appCollection } from './firebase'
export interface DatalayerEvent {
  propName: string
  childrens?: DatalayerEvent[]
  isArray?: boolean
  isEdit?: boolean
  isMeta?: Record<number, string>
  value?: string
}

export const events = appCollection<DatalayerEvent[]>('events', [])

export const selectedEventIndex = writable<number>(-1)

export const EVENTS_TYPES = [
  'imPageView',
  'imAnalyticsEvent'
]