// File API separato per tutte le chiamate al backend

export async function loginAPI(loginData) {
  // Dati finti - verranno implementati in seguito
  const response = {
    success: true,
    message: 'Login eseguito con successo',
    user: {
      id: '123456',
      email: loginData.email,
      name: 'Marco Rossi',
    },
    token: 'fake-jwt-token-xyz789',
  };

  console.log('📤 Login Request:', loginData);
  console.log('📥 Login Response:', response);

  return response;
}

export async function registerAPI(registerData) {
  // Dati finti - verranno implementati in seguito
  const response = {
    success: true,
    message: 'Registrazione eseguita con successo',
    user: {
      id: '789012',
      email: registerData.email,
      name: 'Nuovo Utente',
    },
    token: 'fake-jwt-token-abc123',
  };

  console.log('📤 Register Request:', registerData);
  console.log('📥 Register Response:', response);

  return response;
}

export async function logoutAPI() {
  // Dati finti - verranno implementati in seguito
  const response = {
    success: true,
    message: 'Logout eseguito con successo',
  };

  console.log('📥 Logout Response:', response);

  return response;
}
