import axios from 'axios';

export function useExternalApi() {
  const httpService = axios.create({
    baseURL: '/api',
  });

  function get<T>(endpoint: string): Promise<T> {
    return new Promise((resolve, reject) => {
      httpService
        .get(`/${endpoint}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  function post<T, R>(endpoint: string, body?: T): Promise<R> {
    return new Promise((resolve, reject) => {
      httpService
        .post(`/${endpoint}`, body)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  return {
    get,
    post,
  };
}
