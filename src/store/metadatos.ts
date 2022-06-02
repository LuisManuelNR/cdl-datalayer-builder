import { appCollection } from 'src/db/firebase'
export interface Metadata {
  name: string
  color: string,
}

export const metadata = appCollection<Metadata[]>('metadata', [])