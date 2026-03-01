/**
 * LinkedIn Scout
 * Парсинг вакансий и профилей с LinkedIn (через API и скрапинг)
 * 
 * Для работы требуется LinkedIn Premium или Sales Navigator
 */

import puppeteer from 'puppeteer';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const CONFIG = {
  linkedinEmail: process.env.LINKEDIN_EMAIL,
  linkedinPassword: process.env.LINKEDIN_PASSWORD,
  openaiApiKey: process.env.OPENAI_API_KEY,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_ANON_KEY,
  
  // Направления для поиска
  directions: [
    {
      name: 'web3',
      queries: [
        'Web3 Product Manager',
        'Blockchain Product Manager',
        'DeFi Product Manager',
        'NFT Project Manager',
        'Tokenomics Specialist',
        'Web3 Developer',
        'Solidity Developer',
      ],
      locations: ['Worldwide', 'Dubai', 'Israel', 'Remote'],
    },
    {
      name: 'product',
      queries: [
        'Product Manager',
        'Senior Product Manager',
        'Lead Product Manager',
        'Head of Product',
        'Director of Product',
        'Product Lead',
        'Technical Product Manager',
      ],
      locations: ['Worldwide', 'Remote', 'Dubai', 'Israel', 'Europe'],
    },
    {
      name: 'marketing',
      queries: [
        'Head of Marketing',
        'Marketing Manager',
        'Growth Manager',
        'CMO',
        'Marketing Director',
        'Brand Manager',
        'Performance Marketing Manager',
      ],
      locations: ['Worldwide', 'Remote'],
    },
    {
      name: 'design',
      queries: [
        'Product Designer',
        'UX Designer',
        'UI Designer',
        'Head of Design',
        'Design Lead',
        'Creative Director',
        'Art Director',
      ],
      locations: ['Worldwide', 'Remote'],
    },
  ],
  
  checkInterval: 4 * 60 * 60 * 1000, // 4 часа
};

const openai = new OpenAI({ apiKey: CONFIG.openaiApiKey });
const supabase = createClient(CONFIG.supabaseUrl!, CONFIG.supabaseKey!);

/**
 * Парсинг вакансий LinkedIn
 */
async function scrapeLinkedInJobs(direction: typeof CONFIG.directions[0]) {
  const browser = await puppeteer.launch({ 
    headless: false, // Для первого логина
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Логин (только при первом запуске)
    await page.goto('https://www.linkedin.com/login');
    await page.type('#username', CONFIG.linkedinEmail!);
    await page.type('#password', CONFIG.linkedinPassword!);
    await page.click('[type="submit"]');
    await page.waitForNavigation();
    
    console.log('✅ Logged in to LinkedIn');
    
    const allJobs: any[] = [];
    
    for (const query of direction.queries) {
      for (const location of direction.locations) {
        try {
          // Формируем URL поиска
          const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&f_TPR=r86400`;
          
          await page.goto(searchUrl, { waitUntil: 'networkidle2' });
          await page.waitForTimeout(3000);
          
          // Скроллим для загрузки вакансий
          for (let i = 0; i < 3; i++) {
            await page.evaluate(() => {
              window.scrollTo(0, document.body.scrollHeight);
            });
            await page.waitForTimeout(2000);
          }
          
          // Извлекаем данные
          const jobs = await page.evaluate(() => {
            const jobCards = document.querySelectorAll('[data-job-id]');
            return Array.from(jobCards).slice(0, 10).map(card => {
              const title = card.querySelector('h3')?.textContent?.trim();
              const company = card.querySelector('[class*="company"]')?.textContent?.trim();
              const location = card.querySelector('[class*="location"]')?.textContent?.trim();
              const link = card.querySelector('a')?.href;
              const description = card.querySelector('[class*="description"]')?.textContent?.trim();
              
              return {
                title,
                company,
                location,
                link,
                description: description?.slice(0, 500),
              };
            });
          });
          
          allJobs.push(...jobs);
          console.log(`Found ${jobs.length} jobs for "${query}" in ${location}`);
          
          // Задержка между запросами
          await page.waitForTimeout(5000);
          
        } catch (error) {
          console.error(`Error scraping ${query} in ${location}:`, error);
        }
      }
    }
    
    return allJobs;
    
  } finally {
    await browser.close();
  }
}

/**
 * Поиск профилей (для нетворкинга)
 */
async function searchLinkedInProfiles(keywords: string[], industry: string) {
  const browser = await puppeteer.launch({ headless: true });
  
  try {
    const page = await browser.newPage();
    
    // Логин...
    await page.goto('https://www.linkedin.com/login');
    // ... авторизация
    
    const profiles: any[] = [];
    
    for (const keyword of keywords) {
      const searchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(keyword)}&industry=${encodeURIComponent(industry)}`;
      
      await page.goto(searchUrl);
      await page.waitForTimeout(3000);
      
      // Извлекаем профили
      const people = await page.evaluate(() => {
        const cards = document.querySelectorAll('[data-test-search-result="PROFILE"]');
        return Array.from(cards).slice(0, 10).map(card => {
          const name = card.querySelector('[class*="name"]')?.textContent?.trim();
          const title = card.querySelector('[class*="title"]')?.textContent?.trim();
          const company = card.querySelector('[class*="company"]')?.textContent?.trim();
          const link = card.querySelector('a')?.href;
          
          return { name, title, company, link };
        });
      });
      
      profiles.push(...people);
    }
    
    return profiles;
    
  } finally {
    await browser.close();
  }
}

/**
 * AI-анализ вакансии/профиля
 */
async function analyzeLinkedInItem(item: any, type: 'job' | 'profile') {
  const prompt = type === 'job' 
    ? `Анализ вакансии LinkedIn для кандидата (PM с 7+ годами, Web3 опыт):\n${JSON.stringify(item)}`
    : `Анализ профиля LinkedIn для нетворкинга:\n${JSON.stringify(item)}`;
    
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Проанализируй и верни JSON: { score: 0-100, reasoning: string, recommendation: "connect" | "apply" | "ignore" }'
        },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
    });
    
    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    return { score: 0, recommendation: 'ignore' };
  }
}

/**
 * Генерация персонализированного сообщения
 */
async function generateLinkedInMessage(profile: any, type: 'connection' | 'job') {
  const prompt = type === 'connection'
    ? `Напиши короткое приветственное сообщение для LinkedIn. Кому: ${profile.name}, ${profile.title} at ${profile.company}. От кого: Тимур Садыков, Product Manager с 7+ годами опыта в Web3 и PropTech. Цель: нетворкинг, возможное сотрудничество.`
    : `Напиши сопроводительное сообщение к отклику на вакансию. Вакансия: ${profile.title} at ${profile.company}.`;
    
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    return 'Здравствуйте! Хотел бы познакомиться и обсудить возможное сотрудничество.';
  }
}

/**
 * Сохранение в базу
 */
async function saveLinkedInData(data: any, type: 'job' | 'profile') {
  const table = type === 'job' ? 'linkedin_jobs' : 'linkedin_profiles';
  
  const { error } = await supabase
    .from(table)
    .upsert([{
      ...data,
      created_at: new Date().toISOString(),
    }], { onConflict: 'link' });
    
  if (error) console.error('Save error:', error);
}

/**
 * Главный цикл
 */
async function main() {
  console.log('🚀 LinkedIn Scout starting...');
  
  for (const direction of CONFIG.directions) {
    console.log(`\n📍 Processing direction: ${direction.name}`);
    
    // Парсим вакансии
    const jobs = await scrapeLinkedInJobs(direction);
    console.log(`Found ${jobs.length} total jobs`);
    
    // Анализируем и сохраняем
    for (const job of jobs) {
      if (!job.title) continue;
      
      const analysis = await analyzeLinkedInItem(job, 'job');
      
      if (analysis.score >= 70) {
        const message = await generateLinkedInMessage(job, 'job');
        
        await saveLinkedInData({
          ...job,
          direction: direction.name,
          score: analysis.score,
          reasoning: analysis.reasoning,
          recommendation: analysis.recommendation,
          generated_message: message,
        }, 'job');
        
        console.log(`✅ Saved: ${job.title} at ${job.company} (score: ${analysis.score})`);
      }
    }
  }
  
  console.log('\n✅ LinkedIn Scout completed');
}

// Запуск
main().catch(console.error);

// Периодический запуск
setInterval(() => {
  console.log('\n⏰ Scheduled LinkedIn run...');
  main().catch(console.error);
}, CONFIG.checkInterval);
