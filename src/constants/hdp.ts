export const HDP_SECTION_NAV = [
  { id: 'about', label: 'About' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'nearby', label: 'Nearby Places' },
  { id: 'reviews', label: 'Reviews' },
] as const;

export type HdpSectionId = (typeof HDP_SECTION_NAV)[number]['id'];

export const HDP_SAMPLE_AMENITIES = [
  '🧹 Housekeeping',
  '📶 Internet',
  '💧 Water',
  '🫙 Washing machine',
  '🚰 RO Drinking Water',
  '🛗 Lift',
  '🪑 Sofa',
  '🛋️ Soft furnishing',
  '📺 65" LED TV',
  '🏓 Table tennis',
  '🥘 Microwave',
] as const;

export const HDP_SAMPLE_FAQ = [
  { question: 'What is included in the rent?', answer: '' },
  { question: 'Is food included?', answer: '' },
  {
    question: 'What is the notice period?',
    answer:
      'The standard notice period is 30 days. Please check with the property manager for specific terms.',
  },
  { question: 'Can I bring guests?', answer: '' },
  { question: 'Is parking available?', answer: '' },
  { question: 'What documents are needed?', answer: '' },
  { question: 'Is there a curfew?', answer: '' },
] as const;
