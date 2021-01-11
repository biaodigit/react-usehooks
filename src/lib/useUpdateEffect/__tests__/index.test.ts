import { renderHook } from '@testing-library/react-hooks'
import useUpdateEffect from '../index'

describe('useUpdateEffect', () => {
  it('should be defined', () => {
    expect(useUpdateEffect).toBeDefined()
  })

  it('test on mounted', () => {
    let mountedCount = 1
    let hook = renderHook(() => {
      useUpdateEffect(() => {
        mountedCount = 2
      })
    })

    expect(mountedCount).toBe(1)
    hook.rerender()
    expect(mountedCount).toBe(2)
  })

  it('test on optional', () => {
    let mountedCount = 1
    let hook = renderHook(() => {
      useUpdateEffect(() => {
        mountedCount = 3
      }, [mountedCount])
    })

    expect(mountedCount).toBe(1)
    mountedCount = 2
    hook.rerender()
    expect(mountedCount).toBe(3)
  })
})
