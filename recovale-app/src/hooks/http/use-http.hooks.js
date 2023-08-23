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

  const post = async (url, data) => {
    try {
      return await instance.post(url, data);
    } catch (error) {
      throw error;
    }
  };

  const put = (url, data) => {
    try {
      return instance.put(url, data);
    } catch (error) {
      throw error;
    }
  };

  const _delete = (url) => {
    try {
      return instance.delete(url);
    } catch (error) {
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    _delete,
  };
}
