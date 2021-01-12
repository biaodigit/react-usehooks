import { useEffect } from 'react'
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks'
import useDebounceEffect from '../'
import { sleep } from '../../../utils/testingHelpers'

interface ParamsObj {
  value: any
  wait: number
}

let hook: RenderHookResult<ParamsObj, any>

describe('useDebounceEffect', () => {
  it('useDebounceEffect should work', async () => {
    let mountedState = 1
    const mockEffect = jest.fn(() => {})
    const mockCleanUp = jest.fn(() => {})
    act(() => {
      hook = renderHook(() =>
        useDebounceEffect(
          () => {
            mockEffect()
            return () => {
              mockCleanUp()
            }
          },
          [mountedState],
          { wait: 200 },
        ),
      )
      // hook = renderHook(() =>
      //   useEffect(() => {
      //     mockEffect()
      //     return () => {
      //       mockCleanUp()
      //     }
      //   }, [mountedState]),
      // )
    })
    await act(async () => {
      expect(mockEffect.mock.calls.length).toBe(0)
      expect(mockCleanUp.mock.calls.length).toBe(0)
      mountedState = 2
      hook.rerender()
      await sleep(50)
      expect(mockEffect.mock.calls.length).toBe(0)
      expect(mockCleanUp.mock.calls.length).toBe(0)
      mountedState = 2
      hook.rerender()
      await sleep(50)
      expect(mockEffect.mock.calls.length).toBe(0)
      expect(mockCleanUp.mock.calls.length).toBe(0)
      await sleep(200)
      expect(mockEffect.mock.calls.length).toBe(1)
      expect(mockCleanUp.mock.calls.length).toBe(0)
      mountedState = 4
      hook.rerender()
      await sleep(300)
      expect(mockEffect.mock.calls.length).toBe(2)
      expect(mockCleanUp.mock.calls.length).toBe(1)
      mountedState = 5
      hook.rerender()
      await sleep(300)
      expect(mockEffect.mock.calls.length).toBe(3)
      expect(mockCleanUp.mock.calls.length).toBe(2)
    })
  })
})
