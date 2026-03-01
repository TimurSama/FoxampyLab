# 🔧 ИНСТРУКЦИЯ ПО ЗАПУСКУ (Сегодня)

## ⚡ БЫСТРЫЙ СТАРТ (30 минут)

### Шаг 1: Переменные окружения (5 мин)

Создай `.env.local` в корне проекта:

```bash
# === OpenAI (Обязательно) ===
OPENAI_API_KEY=sk-...

# === Supabase (Обязательно) ===
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# === LinkedIn (Для парсера вакансий) ===
LINKEDIN_EMAIL=your@email.com
LINKEDIN_PASSWORD=your_password

# === Telegram Bot (Для Job Hunter) ===
TELEGRAM_BOT_TOKEN=123456:ABC...
TELEGRAM_CHAT_ID=your_chat_id

# === Email (Для рассылок) ===
EMAIL_USER=your@email.com
EMAIL_PASS=app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# === GitHub (Для Investor Finder) ===
GITHUB_TOKEN=ghp_...

# === Product Hunt (Для стартап поиска) ===
PH_API_KEY=...
```

**Где взять:**
- OpenAI: https://platform.openai.com/api-keys
- Supabase: https://supabase.com → New Project → Settings → API
- Telegram Bot: @BotFather → /newbot
- LinkedIn: свои логин/пароль

---

### Шаг 2: Установка зависимостей (5 мин)

```bash
cd FoxampyLab
npm install telegram @supabase/supabase-js openai puppeteer cheerio node-cron dotenv nodemailer
```

---

### Шаг 3: Создание таблиц в Supabase (10 мин)

Зайди в Supabase → SQL Editor → New query → Выполни:

```sql
-- Основные таблицы
CREATE TABLE hh_vacancies (
    id TEXT PRIMARY KEY,
    title TEXT,
    company TEXT,
    description TEXT,
    salary_from INTEGER,
    salary_to INTEGER,
    currency TEXT,
    url TEXT,
    published_at TIMESTAMP,
    score INTEGER,
    matched_skills TEXT[],
    red_flags TEXT[],
    recommendation TEXT,
    cover_letter TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE linkedin_jobs (
    id SERIAL PRIMARY KEY,
    title TEXT,
    company TEXT,
    location TEXT,
    description TEXT,
    link TEXT UNIQUE,
    direction TEXT,
    score INTEGER,
    reasoning TEXT,
    recommendation TEXT,
    generated_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE telegram_leads (
    id SERIAL PRIMARY KEY,
    chat_id TEXT,
    chat_title TEXT,
    message_text TEXT,
    sender TEXT,
    message_date TIMESTAMP,
    category TEXT,
    score INTEGER,
    extracted_contacts JSONB,
    ai_analysis JSONB,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE web3_leads (
    id SERIAL PRIMARY KEY,
    source TEXT,
    company_name TEXT,
    contact_name TEXT,
    contact_title TEXT,
    contact_link TEXT,
    project_description TEXT,
    funding_stage TEXT,
    score INTEGER,
    direction TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE webdev_leads (
    id SERIAL PRIMARY KEY,
    source TEXT,
    company_name TEXT,
    contact_name TEXT,
    contact_title TEXT,
    contact_link TEXT,
    project_description TEXT,
    budget TEXT,
    score INTEGER,
    direction TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE marketing_leads (
    id SERIAL PRIMARY KEY,
    source TEXT,
    company_name TEXT,
    contact_name TEXT,
    contact_title TEXT,
    contact_link TEXT,
    project_description TEXT,
    industry TEXT,
    score INTEGER,
    direction TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE design_leads (
    id SERIAL PRIMARY KEY,
    source TEXT,
    company_name TEXT,
    contact_name TEXT,
    contact_title TEXT,
    contact_link TEXT,
    project_description TEXT,
    design_type TEXT,
    score INTEGER,
    direction TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE outreach_messages (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER,
    direction TEXT,
    channel TEXT,
    message_text TEXT,
    sent_at TIMESTAMP,
    status TEXT DEFAULT 'sent',
    opened_at TIMESTAMP,
    replied_at TIMESTAMP
);

-- Views для аналитики
CREATE VIEW daily_stats AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) FILTER (WHERE status = 'new') as new_leads,
    COUNT(*) FILTER (WHERE status = 'contacted') as contacted,
    COUNT(*) FILTER (WHERE status = 'responded') as responded
FROM web3_leads
GROUP BY DATE(created_at);
```

---

### Шаг 4: Первый запуск парсеров (10 мин)

#### 4.1 HH.ru Parser (СНГ рынок)

```bash
cd FoxampyLab/automations/parsers
npx ts-node hh-rabota-parser.ts
```

**Что произойдёт:**
- Спарсит 8 поисковых запросов (PM, Web3 PM, etc.)
- Проанализирует AI (score 0-100)
- Сохранит в Supabase только вакансии с score > 60
- Сгенерирует сопроводительные письма

**Ожидаемый результат:** 10-30 вакансий за один прогон

---

#### 4.2 LinkedIn Scout (Международный рынок)

```bash
npx ts-node linkedin-scout.ts
```

**ВАЖНО:** При первом запуске откроется браузер — залогинься в LinkedIn вручную.

**Что произойдёт:**
- 4 направления × 7 queries × 4 locations = ~112 поисков
- AI-анализ каждой вакансии
- Сохранение релевантных (score > 70)

**Ожидаемый результат:** 20-50 вакансий

---

#### 4.3 Telegram Job Hunter

```bash
npx ts-node telegram-job-hunter.ts
```

**Настройка:** Открой `telegram-job-hunter.ts` и добавь свои чаты:

```typescript
const JOB_CHATS = [
  '@pm_jobs',
  '@product_jobs_ru', 
  '@web3_jobs',
  '@crypto_jobs',
  '@marketing_smm',
  '@design_jobs',
  '@frontend_ru',
  '@dev_by',
  // Добавь свои чаты
];
```

**Что произойдёт:**
- Мониторинг 10+ чатов
- AI-классификация сообщений
- Извлечение контактов

---

## 📊 РАСПРЕДЕЛЕНИЕ ПО НАПРАВЛЕНИЯМ

### Web3 / Blockchain

**Поиск работы (20 позиций):**
```
1. Web3 Product Manager
2. Blockchain Product Manager
3. DeFi Product Manager
4. Web3 Project Manager
5. Tokenomics Consultant
6. Blockchain Developer
7. Smart Contract Developer
8. dApp Developer
9. Solidity Developer
10. Rust Blockchain Developer
11. Web3 UX Designer
12. DAO Operations Manager
13. NFT Project Manager
14. Crypto Product Lead
15. Blockchain Architect
16. Protocol Engineer
17. Cryptography Engineer
18. Web3 Marketing Manager
19. Crypto Analyst
20. DeFi Strategist
```

**Поиск клиентов (15 категорий):**
- Web3 startup, DeFi protocol, NFT marketplace
- DAO, Blockchain infrastructure, Crypto exchange
- Wallet development, GameFi project, RWA tokenization
- Layer 2 solution, Cross-chain bridge, Crypto payment
- Staking platform, Launchpad, Yield farming

**Услуги (7 пакетов):**
| Пакет | Цена | Срок |
|-------|------|------|
| Full Cycle | $25K-50K | 12-16 недель |
| Web3 MVP | $15K-25K | 8-12 недель |
| Smart Contracts | $8K-15K | 4-6 недель |
| Tokenomics | $5K-8K | 2-3 недели |
| dApp Development | $12K-20K | 6-8 недель |
| Security Audit | $5K-10K | 1-2 недели |
| Consulting | $500/час | Почасовая |

**Каналы:**
- Telegram: @crypto_jobs, @web3_jobs, @defi_ru, @nft_ru, @dao_ru, @solana_ru, @ton_dev
- LinkedIn: Web3 Professionals, Blockchain Developers
- Сайты: web3.career, cryptocurrencyjobs.co

---

### Web Development

**Поиск работы (20 позиций):**
```
1. Product Manager
2. Project Manager
3. Technical Product Manager
4. Digital Product Manager
5. E-commerce Product Manager
6. SaaS Product Manager
7. Platform Product Manager
8. Full Stack Developer
9. Frontend Developer
10. Backend Developer
11. React Developer
12. Next.js Developer
13. Node.js Developer
14. Mobile App Developer
15. React Native Developer
16. Flutter Developer
17. DevOps Engineer
18. System Architect
19. CTO
20. Technical Lead
```

**Поиск клиентов (14 категорий):**
- E-commerce platform, SaaS startup, Marketplace
- Corporate website, Mobile app, Internal tool
- CRM system, ERP development, Educational platform
- Healthcare app, Fintech app, Real estate platform
- Booking system, Logistics platform

**Услуги (7 пакетов):**
| Пакет | Цена | Срок |
|-------|------|------|
| Digital Ecosystem | $35K-80K | 4-6 месяцев |
| MVP Development | $8K-15K | 6-10 недель |
| Full-Cycle Dev | $20K-50K | 3-6 месяцев |
| E-commerce | $15K-30K | 8-12 недель |
| Mobile App | $12K-25K | 8-12 недель |
| Website | $5K-15K | 3-6 недель |
| Team as a Service | $6K/мес | 3+ месяца |

**Каналы:**
- Telegram: @pm_jobs, @product_jobs_ru, @dev_by, @frontend_ru
- LinkedIn: Product Management, SaaS Founders
- Сайты: hh.ru, angel.co, wellfound.com

---

### Marketing / Growth

**Поиск работы (20 позиций):**
```
1. Head of Marketing
2. Marketing Manager
3. Chief Marketing Officer
4. CMO
5. Growth Manager
6. Growth Lead
7. Performance Marketing Manager
8. Performance Marketing Lead
9. Digital Marketing Manager
10. Product Marketing Manager
11. Brand Manager
12. Marketing Director
13. VP of Marketing
14. Head of Growth
15. Head of Performance
16. Marketing Strategist
17. Growth Hacker
18. Acquisition Manager
19. Retention Manager
20. CRM Manager
```

**Поиск клиентов (15 категорий):**
- Performance marketing, Brand strategy, Product launch
- Growth strategy, Digital marketing campaign, Content strategy
- Social media marketing, Influencer marketing, App marketing
- User acquisition, Retention optimization, Marketing automation
- Analytics setup, CRO optimization, Go-to-market strategy

**Услуги (7 пакетов):**
| Пакет | Цена | Срок |
|-------|------|------|
| Growth Full Cycle | $15K-30K | 3-4 месяца |
| Performance Marketing | $5K/мес + ads | 3+ месяца |
| GTM Strategy | $8K-12K | 3-4 недели |
| Product Launch | $10K-20K | 4-6 недель |
| Marketing Audit | $3K-5K | 1-2 недели |
| CRO & Analytics | $4K/мес | 2+ месяца |
| Consulting | $400/час | Почасовая |

**Каналы:**
- Telegram: @marketing_smm, @marketing_jobs, @growth_hackers
- LinkedIn: Growth Marketing, Performance Marketing
- Сайты: growthhackers.com, producthunt.com

---

### Design / Creative

**Поиск работы (20 позиций):**
```
1. Product Designer
2. UX Designer
3. UI Designer
4. UX/UI Designer
5. Senior Product Designer
6. Lead Product Designer
7. Head of Design
8. Design Lead
9. Design Director
10. Creative Director
11. Art Director
12. Brand Designer
13. Visual Designer
14. Motion Designer
15. 3D Designer
16. Graphic Designer
17. Web Designer
18. Interaction Designer
19. Design System Designer
20. User Researcher
```

**Поиск клиентов (15 категорий):**
- Product design, UI/UX design, Mobile app design
- Web design, Brand identity, Logo design
- Design system, Motion design, 3D visualization
- Packaging design, Marketing design, Presentation design
- Illustration, Icon design, Design audit

**Услуги (8 пакетов):**
| Пакет | Цена | Срок |
|-------|------|------|
| Design Full Cycle | $20K-40K | 8-12 недель |
| UX/UI Design | $8K-15K | 4-6 недель |
| Mobile App Design | $10K-20K | 6-8 недель |
| Brand Identity | $5K-12K | 3-4 недели |
| Design System | $8K-15K | 4-6 недель |
| Motion Design | $3K-8K | 2-3 недели |
| Design Audit | $2.5K-4K | 1 неделя |
| Web Design | $4K-10K | 3-5 недель |

**Каналы:**
- Telegram: @design_tg, @design_jobs, @uiux_jobs, @figma_ru
- LinkedIn: Product Design, UX/UI Design
- Сайты: dribbble.com, behance.net, awwwards.com

---

## 📤 РЕКЛАМНЫЕ CTA-БЛОКИ

### Готовые блоки для друзей

```
public/promo-blocks/
├── web3-cta.html       → Скриншот → Telegram каналы
├── webdev-cta.html     → Скриншот → Telegram каналы  
├── marketing-cta.html  → Скриншот → Telegram каналы
└── design-cta.html     → Скриншот → Telegram каналы
```

**Как разослать (сегодня):**

1. **Открой каждый HTML** в браузере
2. **Сделай скриншот** (Cmd+Shift+4 на Mac, Win+Shift+S на Win)
3. **Отправь 5-10 друзьям** с пабликами:

```
Привет! Можешь запостить в свой канал?
Это мой продуктовый студий — делаю Web3/WebDev/Marketing/Design
Если будет клиент — 10% тебе

[Прикрепить скриншот CTA]
```

**Ожидаемая конверсия:** 2-5% на клик из канала

---

## 🤖 АВТОМАТИЗАЦИЯ (Запустить сегодня)

### Запуск всех парсеров по расписанию

```bash
# Автозапуск каждые 2 часа (HH.ru)
# Автозапуск каждые 4 часа (LinkedIn)
# Автозапуск каждые 30 мин (Telegram)

npx ts-node automations/scheduler/cron-jobs.ts start
```

### Или вручную одиночные запуски

```bash
# Утром — проверка HH.ru
npx ts-node automations/parsers/hh-rabota-parser.ts

# Днём — LinkedIn
npx ts-node automations/parsers/linkedin-scout.ts

# Вечером — Telegram чаты
npx ts-node automations/parsers/telegram-job-hunter.ts
```

---

## 📈 ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ (Первая неделя)

| Метрика | День 1 | Неделя 1 |
|---------|--------|----------|
| Вакансий (HH) | 20-40 | 150-250 |
| Вакансий (LinkedIn) | 10-30 | 80-150 |
| Лидов из Telegram | 5-15 | 50-100 |
| Отправлено сообщений | 10-20 | 100-200 |
| Ответов | 2-5 | 15-30 |
| Собеседований | 0-1 | 3-7 |

---

## 🚨 ANTI-SPAM ПРАВИЛА (Чтобы не забанили)

### Лимиты (строго соблюдать!)

| Канал | Лимит | Период |
|-------|-------|--------|
| LinkedIn | 20 коннектов | /день |
| HH.ru | 20 откликов | /день |
| Telegram | 30 сообщений | /день |
| Email | 50 писем | /день |

### Ротация

```
День 1: HH.ru (20 откликов)
День 2: LinkedIn (20 коннектов)
День 3: Email (50 писем)
День 4: Telegram (30 сообщений)
День 5: Отдых / Анализ
```

---

## ✅ ЧЕКЛИСТ НА СЕГОДНЯ

- [ ] Создать `.env.local` с ключами
- [ ] Установить зависимости (`npm install`)
- [ ] Создать таблицы в Supabase (SQL выше)
- [ ] Запустить `hh-rabota-parser.ts` → проверить результат
- [ ] Запустить `linkedin-scout.ts` → залогиниться
- [ ] Сделать скриншоты 4 CTA-блоков
- [ ] Отправить CTA 5-10 друзьям с пабликами
- [ ] Настроить cron (или запланировать ручные запуски)

---

## 🆘 ТЕХПОДДЕРЖКА

Если что-то не работает:

1. **Проверь `.env.local`** — все ключи на месте?
2. **Проверь Supabase** — таблицы созданы?
3. **Проверь логи** — какая ошибка?
4. **Запусти вручную** — работает ли парсер без cron?

---

**Время настройки: 30-60 минут**
**Результат: Полностью работающая система автоматизации**
