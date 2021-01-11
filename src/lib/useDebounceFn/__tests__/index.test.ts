import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks'
import useDebounceFn from '../index'
import { sleep } from '../../../utils/testingHelpers'

interface ParamsObj {
  fn: (...args: any[]) => any
  wait: number
}

let count = 0
const debounceFn = (num: number) => {
  count += num
}

const setUp = ({ fn, wait }: ParamsObj) =>
  renderHook(() => useDebounceFn(fn, { wait }))

let hook: RenderHookResult<ParamsObj, ReturnType<typeof useDebounceFn>>

describe('useDebounceFn', () => {
  it('should be defind', () => {
    expect(useDebounceFn).toBeDefined()
  })

  it('run should work', async () => {
    act(() => {
      hook = setUp({
        fn: debounceFn,
        wait: 300,
      })
    })

    await act(async () => {
      hook.result.current.run(2)
      hook.result.current.run(2)
      hook.result.current.run(2)
      hook.result.current.run(2)
      expect(count).toBe(0)
      await sleep(300)
      expect(count).toBe(2)
      hook.result.current.run(3)
      hook.result.current.run(3)
      hook.result.current.run(3)
      hook.result.current.run(3)
      expect(count).toBe(2)
      await sleep(300)
      expect(count).toBe(5)
      hook.result.current.run(3)
      hook.result.current.run(3)
      expect(count).toBe(5)
      await sleep(300)
      expect(count).toBe(8)
    })
  })
})
