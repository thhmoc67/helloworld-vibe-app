import { SUPPORT_CATEGORIES } from '@/constants/tenant';

const CATEGORY_ICONS: Record<(typeof SUPPORT_CATEGORIES)[number]['id'], string> = {
  booking: 'calendar',
  amenities: 'building.2',
  payments: 'creditcard',
  food: 'fork.knife',
  repairs: 'wrench.and.screwdriver',
  abuse: 'exclamationmark.triangle',
  'move-out': 'door.left.hand.open',
  other: 'ellipsis.circle',
};

function normalizeCategoryName(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function getSupportCategoryIcon(categoryName: string) {
  const normalized = normalizeCategoryName(categoryName);

  const match = SUPPORT_CATEGORIES.find((item) => {
    const label = normalizeCategoryName(item.label);
    return normalized === label || normalized.includes(label) || label.includes(normalized);
  });

  return CATEGORY_ICONS[match?.id ?? 'other'];
}

export function getVisibleSubcategories(categoryName: string, children: { name: string; id: string; isVisibleInHC?: boolean }[]) {
  return children.filter((child) => child.isVisibleInHC !== false);
}
