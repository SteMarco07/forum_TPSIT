import { requestJson} from './generalAPI';



export async function loginAPI(loginData) {
  const authResponse = await requestJson(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password,
    }),
  });

  const user = await requestJson(`/users/me`, {
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

  const user = await requestJson(`/users/`, {
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