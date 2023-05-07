interface CallAPIParameters {
  url: string;
  method: string;
  body?: BodyInit;
  headers?: Record<string, string>;
}

export const callAPI = async <T>(params: CallAPIParameters): Promise<T> => {
  const { url, method, body, headers } = params;

  const response = await fetch(url, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  return await response.json();
}
