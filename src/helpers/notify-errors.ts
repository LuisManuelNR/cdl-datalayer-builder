import { CNotifier } from 'chasi-lib'

export default (err: any, target?: string) => {
  if (err.name === 'FirebaseError') {
    CNotifier.error({ title: err.code, target })
  } else {
    CNotifier.error({ title: 'Ha ocurrido un error', target })
  }
}