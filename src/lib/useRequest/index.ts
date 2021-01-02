import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

function useRequest<T>(config: AxiosRequestConfig, dep: any[]) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T | null>(null)
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  useEffect(() => {
    setLoading(true)
    axios({
      ...config,
      cancelToken: source.token,
    })
      .then((res: AxiosResponse<T>) => setData(res.data))
      .finally(() => setLoading(false))
  }, dep)

  useEffect(() => {
    return () => {
      source.cancel('abort request')
    }
  }, [])

  return { loading, data }
}

export default useRequest
