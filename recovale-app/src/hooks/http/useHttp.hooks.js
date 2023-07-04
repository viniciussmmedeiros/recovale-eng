import axios from 'axios'

export function useHttp() {
  const get = async (url) => {
    const response = await axios.get(url)
    return response.data
  }

  const post = (url, data) => {
    return axios.post(url, data)
  }

  const put = (url, data) => {
    return axios.put(url, data)
  }

  const _delete = (url) => {
    return axios.delete(url)
  }

  return ({
    get,
    post,
    put,
    _delete
  })
}