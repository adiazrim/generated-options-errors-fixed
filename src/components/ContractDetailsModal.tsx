import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useOpportunityStore } from '@/hooks/use-opportunity-store';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
export function ContractDetailsModal() {
  const selectedOpportunity = useOpportunityStore((s) => s.selectedOpportunity);
  const setSelectedOpportunity = useOpportunityStore((s) => s.setSelectedOpportunity);
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedOpportunity(null);
    }
  };
  return (
    <Dialog open={!!selectedOpportunity} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        {selectedOpportunity && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display">
                Unusual Contracts for {selectedOpportunity.ticker}
              </DialogTitle>
              <DialogDescription>
                Showing significant option contracts for ${selectedOpportunity.ticker} based on recent activity.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Strike</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead className="text-right">Premium</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">Open Interest</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOpportunity.contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            'font-semibold',
                            contract.type === 'Call'
                              ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10'
                              : 'text-red-500 border-red-500/30 bg-red-500/10'
                          )}
                        >
                          {contract.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">${contract.strike.toFixed(2)}</TableCell>
                      <TableCell className="font-mono">{contract.expiry}</TableCell>
                      <TableCell className="text-right font-mono">${contract.premium.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-mono">{contract.volume.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono">{contract.openInterest.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}