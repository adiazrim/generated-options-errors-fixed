export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Minimal real-world chat example types (shared by frontend and worker)
// Kept for template compatibility, can be removed if not used.
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
// FlowIntel Application Types
export type Sector = 'AI Infrastructure' | 'Energy' | 'Crypto Adjacent' | 'Materials' | 'Defense/Space';
export type FlowDirection = 'Bullish' | 'Bearish' | 'Neutral';
export type PriceRange = 'All' | 'Under $10' | 'Under $5';
export type SortKey = 'probabilityScore' | 'rsi' | 'volumeRatio' | 'uoaPercent';
export type SortOrder = 'asc' | 'desc';
export interface OptionContract {
  id: string;
  type: 'Call' | 'Put';
  strike: number;
  expiry: string; // e.g., "2024-12-20"
  premium: number;
  volume: number;
  openInterest: number;
}
export interface OptionOpportunity {
  id: string;
  ticker: string;
  price: number;
  sector: Sector;
  rsi: number;
  volumeRatio: number;
  uoaPercent: number;
  openInterestChange: number;
  flowDirection: FlowDirection;
  probabilityScore: number;
  catalysts: string[];
  contracts: OptionContract[];
}