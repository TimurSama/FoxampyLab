/**
 * HH.ru & Rabota.by Parser
 * Автоматический сбор вакансий с фильтрацией
 * 
 * Запуск: npx ts-node hh-rabota-parser.ts
 */

import * as puppeteer from 'puppeteer';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// ===== КОНФИГУРАЦИЯ =====
const CONFIG = {
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_ANON_KEY || '',
  
  // Параметры поиска
  queries: [
    { text: 'Project Manager', area: 16 }, // 16 = Минск
    { text: 'Product Manager', area: 16 },
    { text: 'Project Manager', area: 1 },  // 1 = Москва
    { text: 'Product Manager', area: 1 },
    { text: 'Project Manager', area: 2 },  // 2 = СПб
    { text: 'Product Manager remote', area: null },
    { text: 'Web3 Product Manager', area: null },
    { text: 'Blockchain Product Manager', area: null },
  ],
  
  minSalary: 2000, // USD
  checkInterval: 2 * 60 * 60 * 1000, // 2 часа
};

const openai = new OpenAI({ apiKey: CONFIG.openaiApiKey });
const supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey);

// ===== HH.ru API =====

interface HHVacancy {
  id: string;
  name: string;
  description: string;
  salary?: {
    from?: number;
    to?: number;
    currency: string;
  };
  employer: {
    name: string;
    url?: string;
  };
  alternate_url: string;
  published_at: string;
  snippet?: {
    requirement?: string;
    responsibility?: string;
  };
}

/**
 * Парсинг HH.ru через API
 */
async function parseHH(query: string, area: number | null): Promise<HHVacancy[]> {
  const url = new URL('https://api.hh.ru/vacancies');
  url.searchParams.set('text', query);
  url.searchParams.set('per_page', '100');
  url.searchParams.set('period', '1'); // Только за сегодня
  url.searchParams.set('search_field', 'name');
  url.searchParams.set('order_by', 'publication_time');
  
  if (area) {
    url.searchParams.set('area', area.toString());
  }
  
  // Фильтры для remote
  if (query.includes('remote')) {
    url.searchParams.set('schedule', 'remote');
  }
  
  try {
    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'FoxampyBot/1.0 (timursama96@gmail.com)',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HH API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('HH parse error:', error);
    return [];
  }
}

/**
 * AI-анализ вакансии
 */
async function analyzeVacancy(vacancy: HHVacancy): Promise<{
  score: number;
  matchedSkills: string[];
  redFlags: string[];
  recommendation: 'apply' | 'ignore' | 'analyze';
}> {
  const text = `${vacancy.name}\n${vacancy.description || ''}\n${vacancy.snippet?.requirement || ''}`;
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Проанализируй вакансию для кандидата:
          - 7+ лет PM/опыта
- Web3/блокчейн экспертиза
- PropTech/LogTech опыт
- Междисциплинарный подход
- Работал в Израиле, Узбекистане

Верни JSON:
{
  "score": 0-100 (релевантность),
  "matchedSkills": ["skill1", "skill2"],
  "redFlags": ["флаг1"],
  "recommendation": "apply" | "ignore" | "analyze"
}`
        },
        {
          role: 'user',
          content: text.slice(0, 3000)
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });
    
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Analysis error:', error);
    return { score: 0, matchedSkills: [], redFlags: [], recommendation: 'ignore' };
  }
}

/**
 * Генерация сопроводительного письма
 */
async function generateCoverLetter(vacancy: HHVacancy): Promise<string> {
  const prompt = `
Вакансия: ${vacancy.name}
Компания: ${vacancy.employer.name}
Описание: ${vacancy.description?.slice(0, 500)}

Напиши краткое сопроводительное письмо (3-4 предложения) от лица кандидата:
- Тимур Садыков, PM с 7+ годами опыта
- Специализация: Web3, PropTech, блокчейн
- Готов к удаленной работе
- Может выйти сразу

Тон: профессиональный, уверенный, без шаблонов.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Ты пишешь сопроводительные письма для опытного PM.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 250,
    });
    
    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Cover letter error:', error);
    return '';
  }
}

/**
 * Сохранение вакансии
 */
async function saveVacancy(vacancy: HHVacancy, analysis: any, coverLetter: string) {
  try {
    const { error } = await supabase
      .from('hh_vacancies')
      .upsert([{
        id: vacancy.id,
        title: vacancy.name,
        company: vacancy.employer.name,
        description: vacancy.description,
        salary_from: vacancy.salary?.from,
        salary_to: vacancy.salary?.to,
        currency: vacancy.salary?.currency,
        url: vacancy.alternate_url,
        published_at: vacancy.published_at,
        score: analysis.score,
        matched_skills: analysis.matchedSkills,
        red_flags: analysis.redFlags,
        recommendation: analysis.recommendation,
        cover_letter: coverLetter,
        status: 'new',
        created_at: new Date().toISOString(),
      }], { onConflict: 'id' });
    
    if (error) throw error;
  } catch (error) {
    console.error('Save error:', error);
  }
}

/**
 * Авто-отклик на HH (через Puppeteer)
 */
async function autoApplyHH(vacancyId: string, coverLetter: string) {
  const browser = await puppeteer.launch({ headless: false });
  
  try {
    const page = await browser.newPage();
    
    // Логин (нужно один раз авторизоваться вручную)
    await page.goto('https://hh.ru/account/login');
    console.log('Please login manually and press Enter...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
    // Переход к вакансии
    await page.goto(`https://hh.ru/vacancy/${vacancyId}`);
    
    // Клик "Откликнуться"
    await page.waitForSelector('[data-qa="vacancy-response-button"]', { timeout: 5000 });
    await page.click('[data-qa="vacancy-response-button"]');
    
    // Ввод сопроводительного письма
    await page.waitForSelector('[data-qa="vacancy-response-popup-form"]', { timeout: 5000 });
    await page.type('textarea', coverLetter);
    
    // Отправка
    await page.click('[data-qa="vacancy-response-submit-button"]');
    
    console.log(`✅ Applied to vacancy ${vacancyId}`);
    
    // Обновление статуса
    await supabase
      .from('hh_vacancies')
      .update({ status: 'applied', applied_at: new Date().toISOString() })
      .eq('id', vacancyId);
      
  } catch (error) {
    console.error('Auto-apply error:', error);
  } finally {
    await browser.close();
  }
}

/**
 * Главный цикл
 */
async function main() {
  console.log('🚀 HH Parser starting...');
  
  for (const query of CONFIG.queries) {
    console.log(`\n🔍 Searching: ${query.text} (area: ${query.area || 'all'})`);
    
    const vacancies = await parseHH(query.text, query.area);
    console.log(`Found ${vacancies.length} vacancies`);
    
    for (const vacancy of vacancies) {
      // Проверяем зарплату
      const salary = vacancy.salary?.from || vacancy.salary?.to || 0;
      if (vacancy.salary?.currency === 'RUR') {
        if (salary < 150000) continue; // Минимум 150к руб
      } else if (salary < CONFIG.minSalary && salary > 0) {
        continue;
      }
      
      // AI-анализ
      const analysis = await analyzeVacancy(vacancy);
      
      if (analysis.score < 60) {
        console.log(`  ❌ Skipped "${vacancy.name}" (score: ${analysis.score})`);
        continue;
      }
      
      // Генерация письма
      const coverLetter = await generateCoverLetter(vacancy);
      
      // Сохранение
      await saveVacancy(vacancy, analysis, coverLetter);
      
      console.log(`  ✅ Saved "${vacancy.name}" (score: ${analysis.score})`);
      
      // Авто-отклик для высоких скоров
      if (analysis.score >= 80 && analysis.recommendation === 'apply') {
        console.log(`  🎯 High score! Ready for auto-apply`);
        // await autoApplyHH(vacancy.id, coverLetter); // Раскомментировать для авто-отклика
      }
    }
    
    // Задержка между запросами
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  console.log('\n✅ Parsing completed');
}

// Запуск
main().catch(console.error);

// Периодический запуск
setInterval(() => {
  console.log('\n⏰ Scheduled run...');
  main().catch(console.error);
}, CONFIG.checkInterval);
