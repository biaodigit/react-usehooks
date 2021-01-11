import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks'
import { useState } from 'react'
import usePersistFn from '../'

const TestHooks = () => {
  const [count, setCount] = useState(0)

  const addCount = () => {
    setCount((c) => c + 1)
  }
  const persistFn = usePersistFn(() => count)

  return { addCount, persistFn }
}

let hook: RenderHookResult<[], ReturnType<typeof TestHooks>>

describe('usePersistFn', () => {
  it('usePersistFn should work', () => {
    hook = renderHook(() => TestHooks())

    const currentFn = hook.result.current.persistFn
    expect(hook.result.current.persistFn()).toBe(0)

    act(() => {
      hook.result.current.addCount()
    })
    expect(currentFn).toEqual(hook.result.current.persistFn)
    expect(hook.result.current.persistFn()).toBe(1)
  })
})
