import { HandlerResponse } from '@netlify/functions';

interface SuccessResponse extends HandlerResponse {
  statusCode: 200;
  body: string;
}

interface ServerErrorResponse extends HandlerResponse {
  statusCode: 500;
  body: 'Internal Server Error';
}

export type ApiResponse = SuccessResponse | ServerErrorResponse;
