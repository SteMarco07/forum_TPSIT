 export const API_BASE_URL ='http://localhost';

export async function requestJson(url, options = {}) {
  const response = await fetch(API_BASE_URL + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail || data?.message || 'Richiesta fallita');
  }

  return data;
}

export async function requestJsonWithToken(url, token, options = {}) {
  return requestJson(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
}
