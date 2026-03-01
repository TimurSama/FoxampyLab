/**
 * Email Outreach Automation
 * Персонализированные рассылки потенциальным клиентам/инвесторам
 */

import nodemailer from 'nodemailer';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const CONFIG = {
  // SMTP настройки (например, SendGrid, AWS SES, или Gmail)
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER || 'apikey',
      pass: process.env.SMTP_PASS || '',
    },
  },
  
  fromEmail: 'hello@foxampylab.com',
  fromName: 'Timur Sadykov | Foxampy Lab',
  
  // Лимиты (чтобы не попасть в спам)
  dailyLimit: 50,
  delayBetweenEmails: 30000, // 30 секунд
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

const transporter = nodemailer.createTransport(CONFIG.smtp);

// ===== ШАБЛОНЫ ПИСЕМ =====

interface EmailTemplate {
  subject: string;
  body: string;
  context: string;
}

const TEMPLATES = {
  // Для стартапов, которым нужен MVP
  mvpOffer: {
    subject: (company: string) => `MVP вашего продукта за 90 дней — ${company}`,
    context: `Предложение разработки MVP для стартапа. 
    Акцент: скорость, качество, полный цикл.
    Уникальность: Web3 экспертиза + AI-ускорение.`,
  },
  
  // Для компаний, которым нужен Web3
  web3Offer: {
    subject: (company: string) => `Web3 интеграция для ${company}`,
    context: `Предложение блокчейн-разработки.
    Акцент: токеномика, smart contracts, DeFi.
    Кейс: Realting.uz — токенизация недвижимости.`,
  },
  
  // Для инвесторов
  investorPitch: {
    subject: (name: string) => `${name}, инвестиционная возможность в Foxampy Lab`,
    context: `Питч для инвестора.
    Акцент: 7+ лет опыта, международные проекты, готовая команда.
    Возможность: проектная доля или долгосрочное партнерство.`,
  },
  
  // Для HR/рекрутеров
  jobInquiry: {
    subject: (position: string) => `Отклик на позицию ${position} — Тимур Садыков`,
    context: `Сопроводительное письмо.
    Акцент: релевантный опыт, готовность выйти сразу, международные кейсы.`,
  },
};

/**
 * Генерация персонализированного письма
 */
async function generateEmail(
  template: keyof typeof TEMPLATES,
  recipient: {
    name: string;
    company: string;
    position?: string;
    website?: string;
    industry?: string;
  },
  customContext?: string
): Promise<EmailTemplate> {
  const templateConfig = TEMPLATES[template];
  
  const prompt = `
Напиши персонализированное деловое письмо.

Получатель:
- Имя: ${recipient.name}
- Компания: ${recipient.company}
- Позиция: ${recipient.position || 'N/A'}
- Сайт: ${recipient.website || 'N/A'}
- Индустрия: ${recipient.industry || 'N/A'}

Контекст шаблона: ${templateConfig.context}
Дополнительный контекст: ${customContext || 'Нет'}

Требования:
1. Максимум 150 слов
2. Обращение по имени
3. 1-2 предложения о получателе (персонализация)
4. Ценностное предложение
5. Четкий CTA (ответьте / назначьте звонок)
6. Без шаблонных фраз ("Надеюсь на сотрудничество")
7. Тон: профессиональный, уверенный, не навязчивый

Структура:
Приветствие → Почему пишу → Ценность → CTA → Подпись
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Ты - опытный бизнес-разработчик. Пишешь короткие, эффективные деловые письма.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 400,
    });
    
    const body = response.choices[0].message.content || '';
    const subject = typeof templateConfig.subject === 'function' 
      ? templateConfig.subject(recipient.company)
      : templateConfig.subject;
    
    return { subject, body, context: templateConfig.context };
  } catch (error) {
    console.error('Generation error:', error);
    return {
      subject: typeof templateConfig.subject === 'function' 
        ? templateConfig.subject(recipient.company)
        : 'Предложение сотрудничества',
      body: 'Здравствуйте! Хотел бы предложить сотрудничество. Готов обсудить детали.',
      context: templateConfig.context,
    };
  }
}

/**
 * Отправка письма
 */
async function sendEmail(
  to: string,
  emailData: EmailTemplate,
  trackingId?: string
): Promise<boolean> {
  try {
    // Проверка лимитов
    const today = new Date().toISOString().split('T')[0];
    const { data: sentToday } = await supabase
      .from('sent_emails')
      .select('id')
      .gte('sent_at', today)
      .lt('sent_at', today + 'T23:59:59');
    
    if ((sentToday?.length || 0) >= CONFIG.dailyLimit) {
      console.log('Daily limit reached');
      return false;
    }
    
    // Добавление tracking pixel
    const trackingPixel = trackingId 
      ? `<img src="https://foxampylab.com/api/track/email?id=${trackingId}" width="1" height="1" />`
      : '';
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        ${emailData.body.replace(/\n/g, '<br>')}
        ${trackingPixel}
      </div>
    `;
    
    // Отправка
    await transporter.sendMail({
      from: `"${CONFIG.fromName}" <${CONFIG.fromEmail}>`,
      to,
      subject: emailData.subject,
      text: emailData.body,
      html: htmlBody,
      headers: {
        'X-Mailer': 'Foxampy Outreach Bot',
        'X-Tracking-ID': trackingId || '',
      },
    });
    
    // Сохранение в базу
    await supabase.from('sent_emails').insert([{
      to_email: to,
      subject: emailData.subject,
      body: emailData.body,
      template: emailData.context,
      tracking_id: trackingId,
      opened: false,
      replied: false,
      sent_at: new Date().toISOString(),
    }]);
    
    console.log(`✅ Email sent to ${to}`);
    return true;
    
  } catch (error) {
    console.error('Send error:', error);
    return false;
  }
}

/**
 * Массовая рассылка
 */
async function bulkSend(
  template: keyof typeof TEMPLATES,
  recipients: Array<{
    email: string;
    name: string;
    company: string;
    position?: string;
  }>,
  dryRun: boolean = true
) {
  console.log(`Starting bulk send to ${recipients.length} recipients`);
  console.log(`Mode: ${dryRun ? 'DRY RUN (no actual sending)' : 'LIVE'}`);
  
  let success = 0;
  let failed = 0;
  
  for (const recipient of recipients) {
    try {
      // Генерация письма
      const email = await generateEmail(template, recipient);
      
      console.log(`\n--- ${recipient.email} ---`);
      console.log(`Subject: ${email.subject}`);
      console.log(`Preview: ${email.body.slice(0, 100)}...`);
      
      if (!dryRun) {
        const trackingId = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const sent = await sendEmail(recipient.email, email, trackingId);
        
        if (sent) {
          success++;
        } else {
          failed++;
        }
        
        // Задержка между письмами
        await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenEmails));
      }
      
    } catch (error) {
      console.error(`Failed for ${recipient.email}:`, error);
      failed++;
    }
  }
  
  console.log(`\n✅ Completed: ${success} sent, ${failed} failed`);
}

/**
 * Отслеживание открытий
 */
async function trackEmailOpen(trackingId: string) {
  await supabase
    .from('sent_emails')
    .update({ 
      opened: true, 
      opened_at: new Date().toISOString() 
    })
    .eq('tracking_id', trackingId);
}

/**
 * Проверка ответов (через IMAP)
 */
async function checkReplies() {
  // Здесь можно добавить интеграцию с Gmail API или IMAP
  // для автоматической проверки ответов и обновления статуса
  console.log('Checking replies...');
}

// ===== CLI ИНТЕРФЕЙС =====

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'test':
      // Тестовая отправка себе
      const testEmail = await generateEmail('mvpOffer', {
        name: 'Test',
        company: 'Test Company',
        position: 'CEO',
      });
      console.log('Subject:', testEmail.subject);
      console.log('\nBody:', testEmail.body);
      break;
      
    case 'send':
      // Отправка одному получателю
      const email = args[1];
      const template = args[2] as keyof typeof TEMPLATES || 'mvpOffer';
      const emailData = await generateEmail(template, {
        name: args[3] || 'Friend',
        company: args[4] || 'Company',
      });
      await sendEmail(email, emailData);
      break;
      
    case 'bulk':
      // Массовая рассылка из CSV
      // TODO: Добавить чтение CSV
      console.log('Use: npm run outreach:bulk -- <csv-file> <template>');
      break;
      
    default:
      console.log(`
Usage:
  npm run outreach -- test                    # Тест генерации
  npm run outreach -- send <email> <template> # Отправка одному
  npm run outreach -- bulk <csv> <template>   # Массовая рассылка

Templates: ${Object.keys(TEMPLATES).join(', ')}
      `);
  }
}

main().catch(console.error);

export { generateEmail, sendEmail, bulkSend, trackEmailOpen };
