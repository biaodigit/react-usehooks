import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks'
import useDebounce from '../index'
import { sleep } from '../../../utils/testingHelpers'

interface ParamsObj {
  fn: (...args: any[]) => any
  wait: number
}

let hook: RenderHookResult<ParamsObj, any>

describe('useDebounce', () => {
  it('should be define', () => {
    expect(useDebounce).toBeDefined()
  })
  it('useDebounce should be work', async () => {
    let count = 2

    hook = renderHook(() => useDebounce(count, { wait: 300 }))

    await act(async () => {
      count = 3
      hook.rerender()
      expect(hook.result.current).toBe(2)
      count = 4
      hook.rerender()
      expect(hook.result.current).toBe(2)
      count = 1
      hook.rerender()
      await sleep(400)
      expect(hook.result.current).toBe(1)
    })
  })
})
