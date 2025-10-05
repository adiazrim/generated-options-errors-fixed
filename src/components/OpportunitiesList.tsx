import type { OptionOpportunity } from '@shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useOpportunityStore } from '@/hooks/use-opportunity-store';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, BarChart, Minus, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
interface OpportunitiesListProps {
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
      return <ArrowUp className="w-4 h-4 text-emerald-500" />;
    case 'Bearish':
      return <ArrowDown className="w-4 h-4 text-red-500" />;
    default:
      return <Minus className="w-4 h-4 text-slate-500" />;
  }
};
export function OpportunitiesList({ opportunities }: OpportunitiesListProps) {
  const setSelectedOpportunity = useOpportunityStore((s) => s.setSelectedOpportunity);
  if (opportunities.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No opportunities match the current filters.
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {opportunities.map((op, index) => (
          <motion.div
            key={op.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card
              className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
              onClick={() => setSelectedOpportunity(op)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold font-display">{op.ticker}</CardTitle>
                <Badge variant="secondary" className="text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20">
                  Score: {op.probabilityScore}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">${op.price.toFixed(2)}</div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    {getFlowIndicator(op.flowDirection)}
                    <span>{op.flowDirection} Flow</span>
                  </div>
                  <Badge variant="outline" className="font-normal">{op.sector}</Badge>
                </div>
                <div className="border-t my-3" />
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className={cn("w-4 h-4", getRsiColor(op.rsi))} />
                    <span>RSI: <span className={cn("font-semibold", getRsiColor(op.rsi))}>{op.rsi.toFixed(1)}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="w-4 h-4 text-blue-500" />
                    <span>Vol Ratio: <span className="font-semibold">{op.volumeRatio.toFixed(1)}x</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-500">
                    <ArrowUp className="w-4 h-4" />
                    <span>UOA: <span className="font-semibold">+{op.uoaPercent}%</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-500">
                    <ArrowUp className="w-4 h-4" />
                    <span>OI Δ: <span className="font-semibold">+{op.openInterestChange.toFixed(1)}%</span></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}