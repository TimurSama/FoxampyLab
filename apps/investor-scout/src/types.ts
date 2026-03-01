/**
 * Типы для Investor Finder
 */

export type InvestorRole = 'angel' | 'vc' | 'corporate' | 'founder' | 'developer';
export type InvestmentStage = 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'growth';

export interface InvestorProfile {
  id: string;
  name: string;
  company?: string;
  role: InvestorRole;
  title?: string;
  bio?: string;
  
  // Контакты
  email?: string;
  linkedin?: string;
  twitter?: string;
  telegram?: string;
  github?: string;
  website?: string;
  
  // Инвестиционная активность
  focus: string[];           // Чем интересуется
  stage: InvestmentStage[];  // На каких стадиях инвестирует
  checkSize?: string;        // Размер чека
  location?: string;
  
  // Скоринг
  score: number;             // 0-100
  engagement: number;        // Активность (0-100)
  
  // Метаданные
  source: 'github' | 'producthunt' | 'manual' | 'telegram' | 'linkedin';
  sourceUrl?: string;
  contacted: boolean;
  contactDate?: Date;
  notes?: string;
  tags: string[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  role?: InvestorRole[];
  stage?: InvestmentStage[];
  focus?: string[];
  location?: string;
  minScore?: number;
  contacted?: boolean;
  tags?: string[];
}

export interface GitHubSearchParams {
  language?: string;
  followers?: string;      // ">1000", "100..1000"
  repos?: string;          // ">10"
  location?: string;
  created?: string;        // ">2023-01-01"
  sort?: 'followers' | 'repositories' | 'joined';
  order?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

export interface ProductHuntSearchParams {
  category?: string;
  days?: number;
  featured?: boolean;
  sort?: 'votes' | 'newest' | 'trending';
  per_page?: number;
}

export interface LeadScore {
  score: number;
  reasons: string[];
  recommendations: string[];
}

export interface ExportOptions {
  format: 'csv' | 'json' | 'xlsx';
  filters?: SearchFilters;
  fields?: (keyof InvestorProfile)[];
}
