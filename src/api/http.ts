import axios from 'axios';
import { Platform } from 'react-native';

import config from '@/config';
import { useAuthStore } from '@/stores/auth-store';

export const http = axios.create({
  baseURL: config.BASE_URL.endsWith('/') ? config.BASE_URL : `${config.BASE_URL}/`,
  timeout: 30_000,
});

http.interceptors.request.use((request) => {
  const { token, mobile } = useAuthStore.getState();

  request.headers.mobile = mobile ?? '';
  request.headers.Authorization = token ? `Bearer ${token}` : '';
  request.headers.app = Platform.OS === 'ios' ? 'ios' : 'android';
  request.headers.Origin = config.PUBLIC_URL;

  if (__DEV__) {
    const url = `${request.baseURL ?? ''}${request.url ?? ''}`;
    console.log(`[HTTP] ${(request.method ?? 'GET').toUpperCase()} ${url}`);
  }

  return request;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearSession();
      void import('@/stores/tenant-store').then(({ useTenantStore }) => {
        useTenantStore.getState().clearProfile();
      });
    }
    return Promise.reject(error);
  },
);
