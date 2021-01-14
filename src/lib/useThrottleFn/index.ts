import { useRef, useCallback } from 'react'
import throttle from 'lodash.throttle'
import { ThrottleOptions } from '../useThrottle'

type Fn = (...args: any[]) => any

function useThrottleFn<T extends Fn>(fn: T, options?: ThrottleOptions) {
  const fnRef = useRef<T>(fn)
  fnRef.current = fn

  const wait = options?.wait || 300

  const throttled = useCallback(
    throttle<T>((...args: any[]) => {
      fnRef.current(...args)
    }, wait),
    [],
  )

  return {
    run: throttled as T,
    cancel: throttled.cancel,
  }
}

export default useThrottleFn
