// File API separato per tutte le chiamate al backend

const API_BASE_URL ='https://localhost';

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
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

export async function loginAPI(loginData) {
  const authResponse = await requestJson(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password,
    }),
  });

  const user = await requestJson(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${authResponse.access_token}`,
    },
  });

  const response = {
    success: true,
    message: 'Login eseguito con successo',
    user,
    token: authResponse.access_token,
    tokenType: authResponse.token_type,
  };

  console.log('📤 Login Request:', loginData);
  console.log('📥 Login Response:', response);

  return response;
}

export async function registerAPI(registerData) {
  const payload = {
    username: registerData.username,
    email: registerData.email,
    password: registerData.password,
  };

  const user = await requestJson(`${API_BASE_URL}/users/`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const response = {
    success: true,
    message: 'Registrazione eseguita con successo',
    user,
    token: null,
  };

  console.log('📤 Register Request:', payload);
  console.log('📥 Register Response:', response);

  return response;
}

export async function logoutAPI() {
  const response = {
    success: true,
    message: 'Logout eseguito con successo',
  };

  console.log('📥 Logout Response:', response);

  return response;
}