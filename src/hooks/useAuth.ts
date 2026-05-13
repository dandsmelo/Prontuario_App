export const useAuth = () => {
  const login = (token: string, doctorName: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('doctorName', doctorName);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('doctorName');
  };

  const isAuthenticated = () => Boolean(localStorage.getItem('token'));

  const getDoctorName = () => localStorage.getItem('doctorName');

  return { login, logout, isAuthenticated, getDoctorName };
};
