import { useLayoutEffect, useState } from 'react'

function useDocTitle(title: string) {
    const [state, setState] = useState<string | null>(null)
    useLayoutEffect(() => {
        document.title = title
        setState(state)
    }, [])
    return state
}

export default useDocTitle