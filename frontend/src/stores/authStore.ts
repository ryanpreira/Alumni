import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const isAuthenticated = ref<boolean>(!!token.value);

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
    isAuthenticated.value = true;
  };

  const clearToken = () => {
    token.value = null;
    localStorage.removeItem('token');
    isAuthenticated.value = false;
  };

  return {
    token,
    isAuthenticated,
    setToken,
    clearToken,
  };
});
