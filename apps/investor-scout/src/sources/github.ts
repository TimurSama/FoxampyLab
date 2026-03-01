/**
 * GitHub API Source для поиска инвесторов
 * Бесплатно: 5000 requests/hour
 * Документация: https://docs.github.com/en/rest
 */

import { InvestorProfile, GitHubSearchParams, LeadScore } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubSource {
  private token: string;
  private headers: Record<string, string>;

  constructor(token: string) {
    this.token = token;
    this.headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'FoxampyLab-InvestorFinder',
    };
  }

  /**
   * Поиск разработчиков по критериям
   */
  async searchUsers(params: GitHubSearchParams): Promise<Partial<InvestorProfile>[]> {
    const query = this.buildSearchQuery(params);
    const url = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&sort=${params.sort || 'followers'}&order=${params.order || 'desc'}&per_page=${params.per_page || 30}&page=${params.page || 1}`;

    try {
      const response = await fetch(url, { headers: this.headers });
      
      if (!response.ok) {
        if (response.status === 403) {
          console.warn('GitHub API rate limit exceeded');
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      const users = await Promise.all(
        data.items.map((item: any) => this.enrichUser(item))
      );

      return users.filter(Boolean) as InvestorProfile[];
    } catch (error) {
      console.error('GitHub search error:', error);
      return [];
    }
  }

  /**
   * Поиск по репозиториям блокчейн/Web3 проектов
   */
  async searchBlockchainDevelopers(limit: number = 30): Promise<Partial<InvestorProfile>[]> {
    // Ищем активных контрибьюторов в популярных блокчейн проектах
    const blockchainRepos = [
      'ethereum/go-ethereum',
      'solana-labs/solana',
      'hyperledger/fabric',
      'cosmos/cosmos-sdk',
      'paritytech/polkadot',
    ];

    const contributors: any[] = [];

    for (const repo of blockchainRepos.slice(0, 3)) { // Ограничиваем для rate limit
      try {
        const url = `${GITHUB_API_BASE}/repos/${repo}/contributors?per_page=10`;
        const response = await fetch(url, { headers: this.headers });
        
        if (response.ok) {
          const data = await response.json();
          contributors.push(...data);
        }
      } catch (e) {
        console.warn(`Failed to fetch contributors for ${repo}`);
      }
    }

    // Убираем дубликаты и обогащаем данные
    const uniqueContributors = Array.from(new Map(contributors.map(c => [c.login, c])).values());
    
    const enriched = await Promise.all(
      uniqueContributors.slice(0, limit).map((c: any) => 
        this.enrichUser({ login: c.login, html_url: c.html_url })
      )
    );

    return enriched.filter(Boolean).map(u => ({
      ...u,
      focus: ['blockchain', 'web3', 'defi'],
      source: 'github' as const,
    }));
  }

  /**
   * Поиск основателей стартапов
   */
  async searchFounders(): Promise<Partial<InvestorProfile>[]> {
    return this.searchUsers({
      followers: '>500',
      sort: 'followers',
      per_page: 30,
    });
  }

  /**
   * Обогащение данных пользователя
   */
  private async enrichUser(user: any): Promise<Partial<InvestorProfile> | null> {
    try {
      const url = `${GITHUB_API_BASE}/users/${user.login}`;
      const response = await fetch(url, { headers: this.headers });
      
      if (!response.ok) return null;
      
      const data = await response.json();
      
      // Получаем репозитории для анализа
      const reposUrl = `${GITHUB_API_BASE}/users/${user.login}/repos?sort=updated&per_page=10`;
      const reposResponse = await fetch(reposUrl, { headers: this.headers });
      const repos = reposResponse.ok ? await reposResponse.json() : [];

      // Анализируем языки и темы
      const languages = new Set<string>();
      const topics = new Set<string>();
      
      repos.forEach((repo: any) => {
        if (repo.language) languages.add(repo.language.toLowerCase());
        if (repo.topics) repo.topics.forEach((t: string) => topics.add(t));
      });

      // Определяем роль
      let role: InvestorProfile['role'] = 'developer';
      const bio = (data.bio || '').toLowerCase();
      
      if (bio.includes('founder') || bio.includes('ceo') || bio.includes('co-founder')) {
        role = 'founder';
      }

      // Скоринг
      const score = this.calculateScore(data, repos.length);

      return {
        id: `github-${data.id}`,
        name: data.name || data.login,
        company: data.company?.replace('@', ''),
        role,
        title: data.bio,
        bio: data.bio,
        github: data.html_url,
        website: data.blog,
        email: data.email,
        location: data.location,
        focus: Array.from(topics).slice(0, 10),
        stage: ['seed', 'series-a'],
        score: score.score,
        engagement: Math.min(100, (data.followers / 100) + repos.length * 2),
        source: 'github',
        sourceUrl: data.html_url,
        contacted: false,
        tags: Array.from(languages).slice(0, 5),
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };
    } catch (error) {
      console.warn(`Failed to enrich user ${user.login}:`, error);
      return null;
    }
  }

  /**
   * Расчет скоринга
   */
  private calculateScore(user: any, repoCount: number): LeadScore {
    let score = 0;
    const reasons: string[] = [];
    const recommendations: string[] = [];

    if (user.followers > 1000) {
      score += 30;
      reasons.push('Высокая популярность (>1000 followers)');
    } else if (user.followers > 500) {
      score += 20;
      reasons.push('Средняя популярность (>500 followers)');
    }

    if (repoCount > 20) {
      score += 25;
      reasons.push('Очень активный разработчик (>20 repos)');
    } else if (repoCount > 10) {
      score += 15;
      reasons.push('Активный разработчик (>10 repos)');
    }

    if (user.email) {
      score += 20;
      reasons.push('Публичный email доступен');
      recommendations.push('Отправить персональное письмо');
    }

    if (user.company) {
      score += 15;
      reasons.push(`Работает в ${user.company}`);
      recommendations.push('Исследовать компанию на LinkedIn');
    }

    if (user.blog) {
      score += 10;
      reasons.push('Имеет личный блог/сайт');
    }

    if (user.bio && (user.bio.includes('founder') || user.bio.includes('CEO'))) {
      score += 15;
      reasons.push('Возможно, основатель стартапа');
      recommendations.push('Проверить LinkedIn на наличие стартапа');
    }

    return {
      score: Math.min(100, score),
      reasons,
      recommendations,
    };
  }

  private buildSearchQuery(params: GitHubSearchParams): string {
    const parts: string[] = ['type:user'];
    if (params.language) parts.push(`language:${params.language}`);
    if (params.followers) parts.push(`followers:${params.followers}`);
    if (params.repos) parts.push(`repos:${params.repos}`);
    if (params.location) parts.push(`location:${params.location}`);
    if (params.created) parts.push(`created:${params.created}`);
    return parts.join(' ');
  }

  async checkRateLimit(): Promise<{ remaining: number; reset: Date } | null> {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/rate_limit`, { headers: this.headers });
      if (response.ok) {
        const data = await response.json();
        return {
          remaining: data.resources.core.remaining,
          reset: new Date(data.resources.core.reset * 1000),
        };
      }
      return null;
    } catch {
      return null;
    }
  }
}
