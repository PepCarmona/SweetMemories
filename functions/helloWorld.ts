import { Handler } from '@netlify/functions';
import { ApiResponse } from '../types/apiResponse';

export const handler: Handler = async (): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: 'Hello World!' }),
        }),
      5000
    );
  });
};
