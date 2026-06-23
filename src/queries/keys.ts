export const queryKeys = {
  common: ['common'] as const,
  home: (city: string) => ['home', city] as const,
};
