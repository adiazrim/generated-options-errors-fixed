import { useEffect, useMemo } from 'react';
import { useOpportunityStore } from '@/hooks/use-opportunity-store';
import { DashboardHeader } from '@/components/DashboardHeader';
import { HighlightsSection } from '@/components/HighlightsSection';
import { FilterPanel } from '@/components/FilterPanel';
import { OpportunitiesTable } from '@/components/OpportunitiesTable';
import { ContractDetailsModal } from '@/components/ContractDetailsModal';
import { Toaster } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { HighlightsSkeleton } from '@/components/skeletons/HighlightsSkeleton';
import { TableSkeleton } from '@/components/skeletons/TableSkeleton';
import { OpportunitiesList } from '@/components/OpportunitiesList';
export function HomePage() {
  const fetchOpportunities = useOpportunityStore((s) => s.fetchOpportunities);
  const isLoading = useOpportunityStore((s) => s.isLoading);
  const opportunities = useOpportunityStore((s) => s.opportunities);
  const filters = useOpportunityStore((s) => s.filters);
  const sorting = useOpportunityStore((s) => s.sorting);
  const isMobile = useIsMobile();
  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);
  const filteredAndSortedOpportunities = useMemo(() => {
    let filtered = [...opportunities];
    // Apply filters
    if (filters.sector !== 'All') {
      filtered = filtered.filter((op) => op.sector === filters.sector);
    }
    if (filters.priceRange === 'Under $10') {
      filtered = filtered.filter((op) => op.price < 10);
    } else if (filters.priceRange === 'Under $5') {
      filtered = filtered.filter((op) => op.price < 5);
    }
    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sorting.sortBy];
      const bValue = b[sorting.sortBy];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sorting.sortOrder === 'desc' ? -comparison : comparison;
      }
      return 0;
    });
    return filtered;
  }, [opportunities, filters, sorting]);
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader />
        <main className="space-y-12 md:space-y-16 py-8">
          {isLoading ? (
            <HighlightsSkeleton />
          ) : (
            <HighlightsSection opportunities={filteredAndSortedOpportunities} />
          )}
          <div className="space-y-8">
            <FilterPanel />
            {isLoading ? (
              <TableSkeleton />
            ) : isMobile ? (
              <OpportunitiesList opportunities={filteredAndSortedOpportunities} />
            ) : (
              <OpportunitiesTable opportunities={filteredAndSortedOpportunities} />
            )}
          </div>
        </main>
        <footer className="text-center py-8 text-muted-foreground">
          <p>Built with ❤️ at Cloudflare</p>
        </footer>
      </div>
      <ContractDetailsModal />
      <Toaster richColors closeButton />
    </div>
  );
}