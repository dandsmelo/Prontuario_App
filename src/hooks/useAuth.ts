export const useAuth = () => {
  const login = (token: string) => {
    localStorage.setItem('token', token);
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  const isAuthenticated = () =>
    Boolean(localStorage.getItem('token'));

  return { login, logout, isAuthenticated };
};
