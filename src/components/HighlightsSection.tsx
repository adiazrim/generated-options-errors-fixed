import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { OptionOpportunity } from '@shared/types';
import { TrendingUp, Zap, BarChart, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
interface HighlightsSectionProps {
  opportunities: OptionOpportunity[];
}
const Stat = ({ icon, label, value, unit = '' }: { icon: React.ReactNode; label: string; value: string | number; unit?: string }) => (
  <div className="flex items-center gap-2 text-sm">
    {icon}
    <span className="text-muted-foreground">{label}:</span>
    <span className="font-semibold text-foreground">{value}{unit}</span>
  </div>
);
export function HighlightsSection({ opportunities }: HighlightsSectionProps) {
  if (!opportunities || opportunities.length === 0) {
    return null;
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    }),
  };
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold font-display mb-6">Top 3 Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {opportunities.slice(0, 3).map((op, index) => (
          <motion.div
            key={op.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="h-full flex flex-col bg-gradient-to-br from-highlightBlue/20 to-card backdrop-blur-sm border-border/50 transition-all duration-300 hover:shadow-highlightBlue hover:shadow-lg hover:-translate-y-1 overflow-hidden">
              <div className="p-6 flex-grow">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold font-display">{op.ticker}</CardTitle>
                    <Badge variant="secondary" className="text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20">
                      Score: {op.probabilityScore}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">${op.price.toFixed(2)}</p>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="space-y-3">
                    <Stat icon={<TrendingUp className="w-4 h-4 text-emerald-500" />} label="RSI" value={op.rsi.toFixed(1)} />
                    <Stat icon={<BarChart className="w-4 h-4 text-blue-500" />} label="Vol Ratio" value={op.volumeRatio.toFixed(1)} unit="x" />
                    <Stat icon={<Tag className="w-4 h-4 text-slate-500" />} label="Sector" value={op.sector} />
                  </div>
                  {op.catalysts.length > 0 && (
                    <div className="pt-3">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        Catalysts
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {op.catalysts.map((cat, i) => (
                          <Badge key={i} variant="outline" className="font-normal">{cat}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}