import { useRef, useCallback } from 'react'
import debounce from 'lodash.debounce'
import { DebounceOptions } from '../useDebounce'

type Fn = (...args: any) => any

function useDebounceFn<T extends Fn>(fn: T, options?: DebounceOptions) {
  const fnRef = useRef<T>(fn)
  fnRef.current = fn

  const wait = options?.wait || 3000
  const debounced = useCallback(
    debounce<T>((...args: any[]) => {
      fnRef.current(...args)
    }, wait),
    [],
  )

  return {
    run: debounced as T,
    cancel: debounced.cancel,
  }
}

export default useDebounceFn
