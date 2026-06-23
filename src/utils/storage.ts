import { useAuthStore } from '@/stores/auth-store';

export async function getSelectedCity(): Promise<string | null> {
  return useAuthStore.getState().selectedCity;
}

export async function setSelectedCity(city: string): Promise<void> {
  useAuthStore.getState().setSelectedCity(city);
}

export async function getMobile(): Promise<string | null> {
  return useAuthStore.getState().mobile;
}

export async function setMobile(mobile: string): Promise<void> {
  useAuthStore.getState().setMobile(mobile);
}

export async function getToken(): Promise<string | null> {
  return useAuthStore.getState().token;
}

export async function setToken(token: string): Promise<void> {
  useAuthStore.getState().setToken(token);
}

export async function clearSession(): Promise<void> {
  useAuthStore.getState().clearSession();
}
