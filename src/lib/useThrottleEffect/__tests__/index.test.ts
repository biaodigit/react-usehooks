import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks'
import useThrottleEffect from '../'
import { sleep } from '../../../utils/testingHelpers'

type ParamsObj = {
  value: any
  wait: number
}

let hook: RenderHookResult<ParamsObj, any>

describe('useThrottleEffect', () => {
  it('useThrottleEffect should work', async () => {
    let count = 1
    let mockEffect = jest.fn()
    let mockCleanUp = jest.fn()

    hook = renderHook(() =>
      useThrottleEffect(
        () => {
          mockEffect()
          return () => {
            mockCleanUp()
          }
        },
        [count],
        { wait: 300 },
      ),
    )

    await act(async () => {
      expect(mockEffect.mock.calls.length).toBe(1)
      expect(mockCleanUp.mock.calls.length).toBe(0)
      count = 2
      hook.rerender()
      await sleep(200)
      expect(mockEffect.mock.calls.length).toBe(1)
      expect(mockCleanUp.mock.calls.length).toBe(0)
      count = 3
      hook.rerender()
      await sleep(200)
      expect(mockEffect.mock.calls.length).toBe(2)
      expect(mockCleanUp.mock.calls.length).toBe(1)
      count = 4
      hook.rerender()
      await sleep(400)
      expect(mockEffect.mock.calls.length).toBe(3)
      expect(mockCleanUp.mock.calls.length).toBe(2)
    })
  })
})
