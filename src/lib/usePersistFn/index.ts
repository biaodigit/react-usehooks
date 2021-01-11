import { useRef } from 'react'

type Fn = (...args: any[]) => any

function usePersistFn<T extends Fn>(fn: T) {
  const fnRef = useRef<T>(fn)
  fnRef.current = fn

  const persistFn = useRef<T>()
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      return fnRef.current.apply(this, ...args)
    } as T
  }

  return persistFn.current!
}

export default usePersistFn
