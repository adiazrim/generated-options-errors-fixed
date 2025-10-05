import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { OptionOpportunity } from '@shared/types';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOpportunityStore } from '@/hooks/use-opportunity-store';
interface OpportunitiesTableProps {
  opportunities: OptionOpportunity[];
}
const getRsiColor = (rsi: number) => {
  if (rsi > 70) return 'text-red-500';
  if (rsi < 30) return 'text-emerald-500';
  return 'text-foreground';
};
const getFlowIndicator = (flow: string) => {
  switch (flow) {
    case 'Bullish':
      return <ArrowUp className="w-4 h-4 text-emerald-500 inline-block mr-1" />;
    case 'Bearish':
      return <ArrowDown className="w-4 h-4 text-red-500 inline-block mr-1" />;
    default:
      return <Minus className="w-4 h-4 text-slate-500 inline-block mr-1" />;
  }
};
const sectorColors: { [key: string]: string } = {
  'AI Infrastructure': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Energy': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'Crypto Adjacent': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'Materials': 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  'Defense/Space': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
};
export function OpportunitiesTable({ opportunities }: OpportunitiesTableProps) {
  const setSelectedOpportunity = useOpportunityStore((s) => s.setSelectedOpportunity);
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Ticker</TableHead>
            <TableHead className="text-right font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Sector</TableHead>
            <TableHead className="text-right font-semibold">RSI</TableHead>
            <TableHead className="text-right font-semibold">Vol Ratio</TableHead>
            <TableHead className="text-right font-semibold">UOA %</TableHead>
            <TableHead className="text-right font-semibold">OI Change</TableHead>
            <TableHead className="font-semibold">Flow</TableHead>
            <TableHead className="text-right font-semibold">Prob. Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {opportunities.length > 0 ? (
              opportunities.map((op, index) => (
                <motion.tr
                  key={op.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: index * 0.05 } }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    <button
                      onClick={() => setSelectedOpportunity(op)}
                      className="font-medium text-primary hover:underline underline-offset-4"
                    >
                      {op.ticker}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">${op.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-normal", sectorColors[op.sector])}>
                      {op.sector}
                    </Badge>
                  </TableCell>
                  <TableCell className={cn('text-right font-mono', getRsiColor(op.rsi))}>
                    {op.rsi.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right font-mono">{op.volumeRatio.toFixed(1)}x</TableCell>
                  <TableCell className="text-right font-mono text-emerald-500">+{op.uoaPercent}%</TableCell>
                  <TableCell className="text-right font-mono text-emerald-500">+{op.openInterestChange.toFixed(1)}%</TableCell>
                  <TableCell className="flex items-center">
                    {getFlowIndicator(op.flowDirection)}
                    {op.flowDirection}
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary">{op.probabilityScore}</TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                  No opportunities match the current filters.
                </TableCell>
              </TableRow>
            )}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}