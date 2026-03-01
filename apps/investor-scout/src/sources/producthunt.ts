/**
 * Product Hunt API Source
 * Документация: https://api.producthunt.com/v2/docs
 * Требуется API Token (бесплатный)
 */

import { InvestorProfile, ProductHuntSearchParams } from '../types';

const PH_API_BASE = 'https://api.producthunt.com/v2/api/graphql';

export class ProductHuntSource {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  /**
   * Поиск топовых продуктов и их создателей
   */
  async searchMakers(params: ProductHuntSearchParams = {}): Promise<Partial<InvestorProfile>[]> {
    const query = `
      query {
        posts(
          first: ${params.per_page || 20},
          order: VOTES,
          featured: ${params.featured !== false}
        ) {
          edges {
            node {
              id
              name
              tagline
              votesCount
              makers {
                id
                name
                username
                headline
                profileImage
                websiteUrl
                twitterUsername
              }
              user {
                id
                name
                username
                headline
              }
              topics {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(PH_API_BASE, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Product Hunt API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        console.error('Product Hunt GraphQL errors:', data.errors);
        return [];
      }

      const makers: Partial<InvestorProfile>[] = [];
      
      data.data?.posts?.edges?.forEach((edge: any) => {
        const post = edge.node;
        const topics = post.topics?.edges?.map((e: any) => e.node.name) || [];

        // Добавляем makers
        post.makers?.forEach((maker: any) => {
          makers.push(this.convertToProfile(maker, post, topics));
        });

        // Добавляем автора поста
        if (post.user && !makers.find(m => m.sourceUrl?.includes(post.user.username))) {
          makers.push(this.convertToProfile(post.user, post, topics));
        }
      });

      return makers;
    } catch (error) {
      console.error('Product Hunt search error:', error);
      return [];
    }
  }

  /**
   * Поиск по категории блокчейн/crypto
   */
  async searchCryptoMakers(): Promise<Partial<InvestorProfile>[]> {
    return this.searchMakers({ per_page: 30 });
  }

  private convertToProfile(maker: any, post: any, topics: string[]): Partial<InvestorProfile> {
    const score = this.calculateScore(maker, post);

    return {
      id: `ph-${maker.id}`,
      name: maker.name,
      role: 'founder',
      title: maker.headline,
      bio: `${maker.headline}. Создатель продукта "${post.name}": ${post.tagline}`,
      
      twitter: maker.twitterUsername ? `https://twitter.com/${maker.twitterUsername}` : undefined,
      website: maker.websiteUrl,
      sourceUrl: `https://www.producthunt.com/@${maker.username}`,
      
      focus: topics,
      stage: ['seed', 'series-a'],
      
      score: score.score,
      engagement: Math.min(100, post.votesCount / 10),
      
      source: 'producthunt',
      contacted: false,
      tags: topics,
      
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  private calculateScore(maker: any, post: any) {
    let score = 0;
    const reasons: string[] = [];
    const recommendations: string[] = [];

    if (post.votesCount > 500) {
      score += 35;
      reasons.push('Вирусный продукт (>500 голосов)');
    } else if (post.votesCount > 100) {
      score += 25;
      reasons.push('Популярный продукт (>100 голосов)');
    }

    if (maker.twitterUsername) {
      score += 15;
      reasons.push('Активен в Twitter');
      recommendations.push('Написать в Twitter');
    }

    if (maker.websiteUrl) {
      score += 10;
      reasons.push('Имеет веб-сайт');
    }

    if (maker.headline?.toLowerCase().includes('founder')) {
      score += 15;
      reasons.push('Основатель');
    }

    return {
      score: Math.min(100, score),
      reasons,
      recommendations,
    };
  }
}
