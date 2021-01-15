import { renderHook } from '@testing-library/react-hooks'
import usePrevious, { compareFunction as cmpFn } from '../'

describe('usePrevious', () => {
  function getHook<T>(initialValue: T, compareFn?: cmpFn<T>) {
    return renderHook(({ val, cmp }) => usePrevious<T>(val as T, cmp), {
      initialProps: {
        val: initialValue || 0,
        cmp: compareFn,
      } as { val: T; cmp?: cmpFn<T> },
    })
  }
  it('should update previous value only after update different value', () => {
    const hook = getHook(0, () => true)
    expect(hook.result.current).toBeUndefined()
    hook.rerender({ val: 1 })
    expect(hook.result.current).toBe(0)
    hook.rerender({ val: 2 })
    expect(hook.result.current).toBe(1)
    hook.rerender({ val: 3 })
    expect(hook.result.current).toBe(2)
  })
  it('should work fine with undefined value', () => {
    const hook = renderHook(({ val }) => usePrevious(val), {
      initialProps: {
        val: undefined,
      },
    })

    expect(hook.result.current).toBeUndefined()
    hook.rerender({ val: 1 })
    expect(hook.result.current).toBeUndefined()
    hook.rerender({ val: undefined })
    expect(hook.result.current).toBe(1)
    hook.rerender({ val: 2 })
    expect(hook.result.current).toBeUndefined()
  })
  it('should compare current an previous', () => {
    const obj1 = { value: '111' }
    const obj2 = { value: '111' }
    const obj3 = { value: '222' }
    type Obj = { value: string }
    const compareFn = (prev: Obj | undefined, next: Obj): boolean =>
      prev ? prev.value !== next.value : true

    const hook = getHook(obj1, compareFn)
    expect(hook.result.current).toBeUndefined()
    hook.rerender({ val: obj2, cmp: compareFn })
    expect(hook.result.current).toBeUndefined()
    hook.rerender({ val: obj3, cmp: compareFn })
    expect(hook.result.current).toEqual(obj1)
  })
})
