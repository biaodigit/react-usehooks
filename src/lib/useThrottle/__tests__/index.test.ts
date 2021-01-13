import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks'
import useThrottle from '../'
import { sleep } from '../../../utils/testingHelpers'

type ParamsObj = {
  val: any
  wait: number
}

let hook: RenderHookResult<ParamsObj, any>

describe('useThrottle', () => {
  it('useThrottle should work', async () => {
    let count = 1
    hook = renderHook(() => useThrottle(count, { wait: 300 }))

    await act(async () => {
      expect(hook.result.current).toBe(1)
      count = 2
      hook.rerender()
      count = 3
      hook.rerender()
      await sleep(200)
      expect(hook.result.current).toBe(1)
      count = 4
      hook.rerender()
      await sleep(300)
      expect(hook.result.current).toBe(4)
    })
  })
})
