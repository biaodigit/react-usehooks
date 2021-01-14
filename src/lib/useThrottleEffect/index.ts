import { useState, useEffect } from 'react'
import useThrottleFn from '../useThrottleFn'
import useUpdateEffect from '../useUpdateEffect'
import useUnmount from '../useUnmount'
import { ThrottleOptions } from '../useThrottle'

function useThrottleEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
  options?: ThrottleOptions,
) {
  const [flag, setFlag] = useState({})
  const { run, cancel } = useThrottleFn(() => {
    setFlag({})
  }, options)

  useEffect(() => {
    run()
  }, deps)

  useUnmount(cancel)

  useUpdateEffect(effect, [flag])
}

export default useThrottleEffect
