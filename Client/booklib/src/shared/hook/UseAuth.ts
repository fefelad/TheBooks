import { useAuthStore } from "../../stores/auth.store";

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    checkAuth,
  } = useAuthStore();

  return {
    // Состояния
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

    //Действия
    login,
    register,
    logout,
    clearError,
    checkAuth,
  };
};
