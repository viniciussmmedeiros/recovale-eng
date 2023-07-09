import axios from "axios";

export function useHttp(baseURL, headers) {
  const instance = axios.create({
    baseURL,
    headers,
  });
  const get = async (url) => {
    try {
      const response = await instance.get(url);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const post = (url, data) => {
    return instance.post(url, data);
  };

  const put = (url, data) => {
    return instance.put(url, data);
  };

  const _delete = (url) => {
    return instance.delete(url);
  };

  return {
    get,
    post,
    put,
    _delete,
  };
}
