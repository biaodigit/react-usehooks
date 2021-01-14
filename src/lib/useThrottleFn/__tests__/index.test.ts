import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks'
import useThrottleFn from '../index'
import { sleep } from '../../../utils/testingHelpers'

interface ParamsObj {
  fn: (...args: any[]) => any
  wait: number
}

let hook: RenderHookResult<ParamsObj, ReturnType<typeof useThrottleFn>>

let count = 0
const throttleFn = (num: number) => {
  count += num
}

const setUp = ({ fn, wait }: ParamsObj) =>
  renderHook(() => useThrottleFn(fn, { wait }))

describe('useThrottleFn', () => {
  it('useThrottleFn should work', async () => {
    hook = setUp({
      fn: throttleFn,
      wait: 300,
    })

    await act(async () => {
      hook.result.current.run(1)
      expect(count).toBe(1)
      hook.result.current.run(3)
      hook.result.current.run(3)
      hook.result.current.run(3)
      hook.result.current.run(3)
      await sleep(200)
      expect(count).toBe(1)
      await sleep(200)
      expect(count).toBe(4)
      hook.result.current.run(2)
      await sleep(300)
      expect(count).toBe(6)
    })
  })
})
