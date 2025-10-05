import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOpportunityStore } from '@/hooks/use-opportunity-store';
import type { Sector, PriceRange, SortKey, SortOrder } from '@shared/types';
import { SlidersHorizontal } from 'lucide-react';
const sectors: (Sector | 'All')[] = ['All', 'AI Infrastructure', 'Energy', 'Crypto Adjacent', 'Materials', 'Defense/Space'];
const priceRanges: PriceRange[] = ['All', 'Under $10', 'Under $5'];
const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'probabilityScore', label: 'Probability Score' },
  { value: 'rsi', label: 'RSI' },
  { value: 'volumeRatio', label: 'Volume Ratio' },
  { value: 'uoaPercent', label: 'UOA %' },
];
export function FilterPanel() {
  const sector = useOpportunityStore((s) => s.filters.sector);
  const priceRange = useOpportunityStore((s) => s.filters.priceRange);
  const sortBy = useOpportunityStore((s) => s.sorting.sortBy);
  const setSectorFilter = useOpportunityStore((s) => s.setSectorFilter);
  const setPriceRangeFilter = useOpportunityStore((s) => s.setPriceRangeFilter);
  const setSorting = useOpportunityStore((s) => s.setSorting);
  const sortOrder = useOpportunityStore((s) => s.sorting.sortOrder);
  const handleSortChange = (value: string) => {
    const [key, order] = value.split('-') as [SortKey, SortOrder];
    setSorting(key, order);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold font-display">
          <SlidersHorizontal className="w-5 h-5" />
          Screening Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sector-select">Sector</Label>
          <Select value={sector} onValueChange={(v) => setSectorFilter(v as Sector | 'All')}>
            <SelectTrigger id="sector-select">
              <SelectValue placeholder="Select a sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Price Range</Label>
          <RadioGroup
            value={priceRange}
            onValueChange={(v) => setPriceRangeFilter(v as PriceRange)}
            className="flex items-center space-x-4 pt-2"
          >
            {priceRanges.map((pr) => (
              <div key={pr} className="flex items-center space-x-2">
                <RadioGroupItem value={pr} id={pr} />
                <Label htmlFor={pr} className="font-normal">{pr}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sort-select">Sort By</Label>
          <Select value={`${sortBy}-${sortOrder}`} onValueChange={handleSortChange}>
            <SelectTrigger id="sort-select">
              <SelectValue placeholder="Sort opportunities" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={`${opt.value}-desc`} value={`${opt.value}-desc`}>{opt.label} (High to Low)</SelectItem>
              ))}
              {sortOptions.map((opt) => (
                <SelectItem key={`${opt.value}-asc`} value={`${opt.value}-asc`}>{opt.label} (Low to High)</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}