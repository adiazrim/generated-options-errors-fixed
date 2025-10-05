import { create } from 'zustand';
import { MOCK_OPPORTUNITIES } from '@shared/mock-data';
import type { OptionOpportunity, Sector, PriceRange, SortKey, SortOrder } from '@shared/types';
import { produce } from 'immer';
interface OpportunityState {
  opportunities: OptionOpportunity[];
  isLoading: boolean;
  filters: {
    sector: Sector | 'All';
    priceRange: PriceRange;
  };
  sorting: {
    sortBy: SortKey;
    sortOrder: SortOrder;
  };
  selectedOpportunity: OptionOpportunity | null;
  fetchOpportunities: () => Promise<void>;
  setSectorFilter: (sector: Sector | 'All') => void;
  setPriceRangeFilter: (priceRange: PriceRange) => void;
  setSorting: (sortBy: SortKey, sortOrder: SortOrder) => void;
  setSelectedOpportunity: (opportunity: OptionOpportunity | null) => void;
}
export const useOpportunityStore = create<OpportunityState>((set) => ({
  opportunities: [],
  isLoading: true,
  filters: {
    sector: 'All',
    priceRange: 'All',
  },
  sorting: {
    sortBy: 'probabilityScore',
    sortOrder: 'desc',
  },
  selectedOpportunity: null,
  fetchOpportunities: async () => {
    set({ isLoading: true });
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    set({ opportunities: MOCK_OPPORTUNITIES, isLoading: false });
  },
  setSectorFilter: (sector) => set(produce((state) => { state.filters.sector = sector; })),
  setPriceRangeFilter: (priceRange) => set(produce((state) => { state.filters.priceRange = priceRange; })),
  setSorting: (sortBy, sortOrder) => set({ sorting: { sortBy, sortOrder } }),
  setSelectedOpportunity: (opportunity) => set({ selectedOpportunity: opportunity }),
}));