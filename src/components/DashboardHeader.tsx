import { ThemeToggle } from '@/components/ThemeToggle';
import { BarChart3 } from 'lucide-react';
export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between py-4 md:py-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
          <BarChart3 className="w-6 h-6" />
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-primary">
          FlowIntel
        </h1>
      </div>
      <ThemeToggle className="relative top-0 right-0" />
    </header>
  );
}