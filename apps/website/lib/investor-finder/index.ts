/**
 * Investor Finder — основной класс для поиска инвесторов
 * 
 * Использует:
 * - GitHub API (бесплатно, 5000 req/hour)
 * - Product Hunt API (требует token)
 * - Ручной ввод через Telegram
 * 
 * Вместо парсинга HTML используем официальные API
 */

import { 
  InvestorProfile, 
  SearchFilters, 
  GitHubSearchParams, 
  ProductHuntSearchParams,
  ExportOptions 
} from './types';
import { GitHubSource } from './sources/github';
import { ProductHuntSource } from './sources/producthunt';

export { GitHubSource, ProductHuntSource };
export * from './types';

export class InvestorFinder {
  private github?: GitHubSource;
  private productHunt?: ProductHuntSource;
  private investors: InvestorProfile[] = [];

  constructor(config: {
    githubToken?: string;
    productHuntToken?: string;
  } = {}) {
    if (config.githubToken) {
      this.github = new GitHubSource(config.githubToken);
    }
    if (config.productHuntToken) {
      this.productHunt = new ProductHuntSource(config.productHuntToken);
    }
  }

  // ==================== ПОИСК ====================

  /**
   * Поиск разработчиков на GitHub
   */
  async searchGitHub(params: GitHubSearchParams): Promise<InvestorProfile[]> {
    if (!this.github) {
      throw new Error('GitHub token not provided');
    }

    console.log('🔍 Searching GitHub...');
    const results = await this.github.searchUsers(params);
    const profiles = results as InvestorProfile[];
    
    this.investors.push(...profiles);
    console.log(`✅ Found ${profiles.length} developers on GitHub`);
    
    return profiles;
  }

  /**
   * Поиск блокчейн-разработчиков
   */
  async findBlockchainDevelopers(limit?: number): Promise<InvestorProfile[]> {
    if (!this.github) {
      throw new Error('GitHub token not provided');
    }

    console.log('⛓️ Searching blockchain developers...');
    const results = await this.github.searchBlockchainDevelopers(limit);
    const profiles = results as InvestorProfile[];
    
    this.investors.push(...profiles);
    console.log(`✅ Found ${profiles.length} blockchain developers`);
    
    return profiles;
  }

  /**
   * Поиск основателей стартапов
   */
  async findFounders(): Promise<InvestorProfile[]> {
    if (!this.github) {
      throw new Error('GitHub token not provided');
    }

    console.log('🚀 Searching founders...');
    const results = await this.github.searchFounders();
    const profiles = results as InvestorProfile[];
    
    this.investors.push(...profiles);
    console.log(`✅ Found ${profiles.length} founders`);
    
    return profiles;
  }

  /**
   * Поиск создателей продуктов на Product Hunt
   */
  async searchProductHunt(params?: ProductHuntSearchParams): Promise<InvestorProfile[]> {
    if (!this.productHunt) {
      throw new Error('Product Hunt token not provided');
    }

    console.log('🎯 Searching Product Hunt...');
    const results = await this.productHunt.searchMakers(params);
    const profiles = results as InvestorProfile[];
    
    this.investors.push(...profiles);
    console.log(`✅ Found ${profiles.length} makers on Product Hunt`);
    
    return profiles;
  }

  // ==================== КОМБИНИРОВАННЫЙ ПОИСК ====================

  /**
   * Комплексный поиск по всем источникам
   */
  async searchAll(options: {
    blockchain?: boolean;
    founders?: boolean;
    makers?: boolean;
    limit?: number;
  } = {}): Promise<InvestorProfile[]> {
    const allResults: InvestorProfile[] = [];

    if (options.blockchain !== false && this.github) {
      const devs = await this.findBlockchainDevelopers(options.limit);
      allResults.push(...devs);
    }

    if (options.founders && this.github) {
      const founders = await this.findFounders();
      allResults.push(...founders);
    }

    if (options.makers && this.productHunt) {
      const makers = await this.searchProductHunt({ per_page: options.limit });
      allResults.push(...makers);
    }

    // Убираем дубликаты по sourceUrl
    const unique = Array.from(
      new Map(allResults.map(i => [i.sourceUrl || i.id, i])).values()
    );

    // Сортируем по скору
    unique.sort((a, b) => b.score - a.score);

    console.log(`\n📊 Total unique leads: ${unique.length}`);
    return unique;
  }

  // ==================== ФИЛЬТРАЦИЯ ====================

  /**
   * Фильтрация инвесторов
   */
  filter(filters: SearchFilters): InvestorProfile[] {
    return this.investors.filter(inv => {
      if (filters.role && !filters.role.includes(inv.role)) return false;
      if (filters.stage && !filters.stage.some(s => inv.stage?.includes(s))) return false;
      if (filters.focus && !filters.focus.some(f => inv.focus?.includes(f))) return false;
      if (filters.location && !inv.location?.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.minScore && inv.score < filters.minScore) return false;
      if (filters.contacted !== undefined && inv.contacted !== filters.contacted) return false;
      if (filters.tags && !filters.tags.some(t => inv.tags?.includes(t))) return false;
      return true;
    });
  }

  /**
   * Получение топ-N инвесторов
   */
  getTop(n: number, minScore: number = 50): InvestorProfile[] {
    return this.investors
      .filter(i => i.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, n);
  }

  // ==================== ЭКСПОРТ ====================

  /**
   * Экспорт в CSV
   */
  exportToCSV(investors?: InvestorProfile[]): string {
    const data = investors || this.investors;
    
    const headers = ['Name', 'Company', 'Role', 'Email', 'LinkedIn', 'Twitter', 'Telegram', 'Location', 'Score', 'Focus', 'Source'];
    
    const rows = data.map(i => [
      i.name,
      i.company || '',
      i.role,
      i.email || '',
      i.linkedin || '',
      i.twitter || '',
      i.telegram || '',
      i.location || '',
      i.score,
      i.focus?.join(', ') || '',
      i.source,
    ]);

    return [headers.join(','), ...rows.map(r => r.map(f => `"${String(f).replace(/"/g, '""')}"`).join(','))].join('\n');
  }

  /**
   * Экспорт в JSON
   */
  exportToJSON(investors?: InvestorProfile[]): string {
    return JSON.stringify(investors || this.investors, null, 2);
  }

  /**
   * Сохранение в файл (только для Node.js)
   */
  async saveToFile(filepath: string, format: 'csv' | 'json' = 'csv'): Promise<void> {
    const fs = await import('fs');
    const content = format === 'csv' 
      ? this.exportToCSV() 
      : this.exportToJSON();
    
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`💾 Saved to ${filepath}`);
  }

  // ==================== SUPABASE ====================

  /**
   * Сохранение в Supabase
   */
  async saveToSupabase(supabaseClient: any, investors?: InvestorProfile[]): Promise<void> {
    const data = investors || this.investors;
    
    const { error } = await supabaseClient
      .from('investors')
      .upsert(data.map(i => ({
        ...i,
        focus: i.focus || [],
        stage: i.stage || [],
        tags: i.tags || [],
        created_at: i.createdAt?.toISOString(),
        updated_at: i.updatedAt?.toISOString(),
      })), { onConflict: 'id' });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log(`💾 Saved ${data.length} investors to Supabase`);
  }

  /**
   * Загрузка из Supabase
   */
  async loadFromSupabase(supabaseClient: any): Promise<InvestorProfile[]> {
    const { data, error } = await supabaseClient
      .from('investors')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    this.investors = data.map((i: any) => ({
      ...i,
      createdAt: new Date(i.created_at),
      updatedAt: new Date(i.updated_at),
    }));

    console.log(`📥 Loaded ${this.investors.length} investors from Supabase`);
    return this.investors;
  }

  // ==================== УТИЛИТЫ ====================

  /**
   * Проверка rate limits
   */
  async checkLimits(): Promise<{ github?: { remaining: number; reset: Date } | null }> {
    return {
      github: this.github ? await this.github.checkRateLimit() : null,
    };
  }

  /**
   * Получение всех инвесторов
   */
  getAll(): InvestorProfile[] {
    return this.investors;
  }

  /**
   * Очистка кэша
   */
  clear(): void {
    this.investors = [];
  }

  /**
   * Статистика
   */
  getStats(): {
    total: number;
    bySource: Record<string, number>;
    byRole: Record<string, number>;
    averageScore: number;
    withEmail: number;
    contacted: number;
  } {
    const bySource: Record<string, number> = {};
    const byRole: Record<string, number> = {};
    let totalScore = 0;
    let withEmail = 0;
    let contacted = 0;

    this.investors.forEach(i => {
      bySource[i.source] = (bySource[i.source] || 0) + 1;
      byRole[i.role] = (byRole[i.role] || 0) + 1;
      totalScore += i.score;
      if (i.email) withEmail++;
      if (i.contacted) contacted++;
    });

    return {
      total: this.investors.length,
      bySource,
      byRole,
      averageScore: this.investors.length ? Math.round(totalScore / this.investors.length) : 0,
      withEmail,
      contacted,
    };
  }
}

// Singleton для использования в приложении
let finderInstance: InvestorFinder | null = null;

export function getInvestorFinder(config?: { githubToken?: string; productHuntToken?: string }): InvestorFinder {
  if (!finderInstance) {
    finderInstance = new InvestorFinder(config);
  }
  return finderInstance;
}
