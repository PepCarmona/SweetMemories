import axios from 'axios';

export class ApiService {
  private httpService = axios.create({
    baseURL: '/api',
  });

  public get<T>(endpoint: string): Promise<T> {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${endpoint}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  public post<T, R>(endpoint: string, body?: T): Promise<R> {
    return new Promise((resolve, reject) => {
      axios
        .post(`/${endpoint}`, body)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }
}
