import { useState, useEffect } from 'react'
import useDebounceFn from '../useDebounceFn'
import useUnmount from '../useUnmount'
import useUpdateEffect from '../useUpdateEffect'
import { DebounceOptions } from '../useDebounce'

function useDebounceEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
  options?: DebounceOptions,
) {
  const [flag, setFlag] = useState({})
  const { run, cancel } = useDebounceFn(() => {
    setFlag({})
  }, options)

  useEffect(() => {
    run()
  }, deps)

  useUnmount(cancel)

  useUpdateEffect(effect, [flag])
}

export default useDebounceEffect
