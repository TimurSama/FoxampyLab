/**
 * Behance & Dribbble Parser
 * Поиск дизайнеров и креативных проектов
 */

import * as cheerio from 'cheerio';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Поисковые запросы для дизайна
const DESIGN_QUERIES = [
  'product design',
  'ux design',
  'ui design',
  'web design',
  'mobile app design',
  'dashboard design',
  'design system',
  'brand identity',
  'motion design',
  '3d design',
];

/**
 * Парсинг Behance
 */
async function parseBehance(query: string) {
  const url = `https://www.behance.net/search/projects?search=${encodeURIComponent(query)}&sort=appreciations&time=week`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const projects: any[] = [];
    
    $('.ProjectCover-root').each((_, el) => {
      const title = $(el).find('.ProjectCover-name').text().trim();
      const author = $(el).find('.ProjectCover-ownerName').text().trim();
      const link = $(el).find('a').attr('href');
      const image = $(el).find('img').attr('src');
      const likes = $(el).find('.ProjectCover-stats').text().trim();
      
      if (title && author) {
        projects.push({
          title,
          author,
          link: link ? `https://www.behance.net${link}` : null,
          image,
          likes,
          platform: 'behance',
          query,
        });
      }
    });
    
    return projects;
  } catch (error) {
    console.error('Behance parse error:', error);
    return [];
  }
}

/**
 * Парсинг Dribbble
 */
async function parseDribbble(query: string) {
  const url = `https://dribbble.com/search/shots?q=${encodeURIComponent(query)}&s=latest`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const shots: any[] = [];
    
    $('.shot-thumbnail').each((_, el) => {
      const title = $(el).find('.shot-title').text().trim();
      const author = $(el).find('.shot-byline-user').text().trim();
      const link = $(el).find('a').attr('href');
      const image = $(el).find('img').attr('src');
      const likes = $(el).find('.js-shot-likes-count').text().trim();
      
      if (title && author) {
        shots.push({
          title,
          author,
          link: link ? `https://dribbble.com${link}` : null,
          image,
          likes,
          platform: 'dribbble',
          query,
        });
      }
    });
    
    return shots;
  } catch (error) {
    console.error('Dribbble parse error:', error);
    return [];
  }
}

/**
 * AI-анализ дизайн-проекта
 */
async function analyzeDesign(project: any) {
  const prompt = `
Проанализируй дизайн-проект для поиска талантов в команду.

Проект: ${project.title}
Автор: ${project.author}
Платформа: ${project.platform}

Оцени:
1. Качество работы (по названию и автору)
2. Релевантность для продуктовой команды
3. Потенциал для найма

Верни JSON: { score: 0-100, style: string, recommendation: "contact" | "save" | "ignore" }
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });
    
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    return { score: 0, recommendation: 'ignore' };
  }
}

/**
 * Сохранение в базу
 */
async function saveDesignTalent(project: any, analysis: any) {
  const { error } = await supabase
    .from('design_talents')
    .upsert([{
      name: project.author,
      project_title: project.title,
      platform: project.platform,
      link: project.link,
      image_url: project.image,
      likes: project.likes,
      style: analysis.style,
      score: analysis.score,
      status: 'new',
      created_at: new Date().toISOString(),
    }], { onConflict: 'link' });
    
  if (error) console.error('Save error:', error);
}

/**
 * Главный цикл
 */
async function main() {
  console.log('🎨 Design platforms parser starting...');
  
  for (const query of DESIGN_QUERIES) {
    console.log(`\n🔍 Searching: ${query}`);
    
    // Behance
    const behanceProjects = await parseBehance(query);
    console.log(`  Behance: ${behanceProjects.length} projects`);
    
    for (const project of behanceProjects.slice(0, 10)) {
      const analysis = await analyzeDesign(project);
      if (analysis.score >= 75) {
        await saveDesignTalent(project, analysis);
        console.log(`    ✅ Saved: ${project.author} (score: ${analysis.score})`);
      }
    }
    
    await new Promise(r => setTimeout(r, 3000));
    
    // Dribbble
    const dribbbleShots = await parseDribbble(query);
    console.log(`  Dribbble: ${dribbbleShots.length} shots`);
    
    for (const shot of dribbbleShots.slice(0, 10)) {
      const analysis = await analyzeDesign(shot);
      if (analysis.score >= 75) {
        await saveDesignTalent(shot, analysis);
        console.log(`    ✅ Saved: ${shot.author} (score: ${analysis.score})`);
      }
    }
    
    await new Promise(r => setTimeout(r, 5000));
  }
  
  console.log('\n✅ Design parser completed');
}

main().catch(console.error);
