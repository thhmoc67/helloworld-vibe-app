export type WishlistApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export type WishlistPropertyId = number;

export type WishlistPropertyCard = {
  id: number;
  image?: string;
  name?: string;
  display_name?: string;
  address?: {
    line1?: string;
    line2?: string;
    locality?: string;
    city?: string;
  };
  min_rent?: number;
  available_beds?: number;
  gender?: string;
  locality?: string;
  city?: string;
  sold_out?: boolean;
  lightning_deal?: boolean;
  free_rent?: boolean;
  is_filling_fast?: boolean;
  filling_fast?: boolean;
  room_types?: string[];
  sharing_types?: string[];
  rating?: number;
  google_rating?: number;
};
