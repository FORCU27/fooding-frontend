import { http, HttpResponse, JsonBodyType } from 'msw';

type NonEmptyArray<T> = [T, ...T[]];

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type MockHandler<TPath extends string = string> = {
  method: HttpMethod;
  path: TPath;
  presets: NonEmptyArray<MockPreset>;
};

type RegisteredMockHandler<TPath extends string = string> = {
  method: HttpMethod;
  path: TPath;
  preset: MockPreset;
};

export type MockPreset<TResponse = JsonBodyType> = {
  label: string;
  status: number;
  response: TResponse;
};

export type MockHandlerGroup = {
  baseUrl: string;
  handlers: MockHandler[];
};

export const matchHandler = (
  a: { method: string; path: string },
  b: { method: string; path: string },
) => {
  return a.method === b.method && a.path === b.path;
};

export const registerHandler = (handlers: RegisteredMockHandler[]) => {
  return handlers.map(({ method, path, preset }) => {
    return http[methodMap[method]](path, () => {
      return HttpResponse.json(preset.response, {
        status: preset.status,
      });
    });
  });
};

const resolveBaseUrl = (baseUrl: string, path: string) => {
  return baseUrl.startsWith('/') ? baseUrl : `${baseUrl}${path}`;
};

export const createMockHandlerGroup = <T extends NonEmptyArray<MockHandler>>(
  baseUrl: string,
  handlers: T,
): MockHandlerGroup => {
  return {
    baseUrl,
    handlers: handlers.map((handler) => {
      return {
        ...handler,
        path: resolveBaseUrl(baseUrl, handler.path),
      };
    }),
  };
};

const methodMap: Record<HttpMethod, keyof typeof http> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};
