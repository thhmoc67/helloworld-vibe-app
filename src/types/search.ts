export type SearchPropertyResult = {
  id: number;
  name: string;
};

export type LocalitySuggestData = {
  locality?: string[];
  properties?: SearchPropertyResult[];
};

export type LocalitySuggestResponse = {
  success: boolean;
  data?: LocalitySuggestData;
  message?: string;
};
