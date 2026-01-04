const MOCK_USER = {
  username: 'admin',
  password: 'password123'
};

export const authenticate = (username, password) => {
  if (username === MOCK_USER.username && password === MOCK_USER.password) {
    localStorage.setItem('authToken', "MOCK_TOKEN");
    return true;
  }
  return false;
}

export const logout = () => {
  localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};