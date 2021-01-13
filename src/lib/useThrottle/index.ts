import { useState, useEffect } from 'react'
import useThrottleFn from '../useThrottleFn'

export interface ThrottleOptions {
  wait?: number
}

function useThrottle(val: any, options?: ThrottleOptions) {
  const [throttled, setThrottled] = useState(val)

  const { run } = useThrottleFn(() => {
    setThrottled(val)
  }, options)

  useEffect(() => {
    run()
  }, [val])

  return throttled
}

export default useThrottle
