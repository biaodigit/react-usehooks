import { useEffect, useRef } from 'react'

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useRef<boolean>()

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      effect()
    }
  }, deps)
}

export default useUpdateEffect
