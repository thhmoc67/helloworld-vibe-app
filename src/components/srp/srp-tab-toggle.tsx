import { SegmentedTabToggle } from '@/components/ui/segmented-tab-toggle';

export type SrpTab = 'properties' | 'details';

const SRP_TABS = [
  { id: 'properties' as const, label: 'Coliving PGs' },
  { id: 'details' as const, label: 'City Details' },
];

type SrpTabToggleProps = {
  value: SrpTab;
  onChange: (tab: SrpTab) => void;
};

export function SrpTabToggle({ value, onChange }: SrpTabToggleProps) {
  return <SegmentedTabToggle value={value} onChange={onChange} tabs={SRP_TABS} />;
}
