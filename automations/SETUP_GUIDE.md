# 🚀 SETUP GUIDE - Полная установка системы

## Что было создано

### 📁 Структура файлов
```
automations/
├── config/
│   ├── directions.config.ts      # Конфиг 4 направлений (Web3, WebDev, Marketing, Design)
│   ├── anti-spam-strategy.md     # Безопасные лимиты и стратегии
│   └── database-schema.sql       # SQL для всех таблиц
├── parsers/
│   ├── hh-rabota-parser.ts       # Парсер вакансий
│   ├── telegram-job-hunter.ts    # Мониторинг Telegram
│   ├── linkedin-scout.ts         # Парсер LinkedIn
│   └── behance-dribbble-parser.ts # Поиск дизайнеров
├── bots/
│   └── telegram-job-hunter.ts    # (уже создан)
├── outreach/
│   └── email-sender.ts           # Email рассылки
├── scheduler/
│   └── cron-jobs.ts              # Планировщик
└── README.md

public/promo-blocks/
├── web3-cta.html      # Рекламный блок Web3
├── webdev-cta.html    # Рекламный блок WebDev
├── marketing-cta.html # Рекламный блок Marketing
└── design-cta.html    # Рекламный блок Design
```

---

## 🎯 БЫСТРЫЙ СТАРТ

### Шаг 1: Установить зависимости
```bash
cd FoxampyLab
npm install telegram @supabase/supabase-js openai puppeteer cheerio node-telegram-bot-api dotenv
```

### Шаг 2: Настроить окружение
Создать файл `.env.local`:

```env
# Telegram API (получить на https://my.telegram.org)
TELEGRAM_API_ID=ваш_api_id
TELEGRAM_API_HASH=ваш_api_hash
TELEGRAM_STRING_SESSION=          # Будет создан при первом запуске

# OpenAI
OPENAI_API_KEY=sk-...

# Supabase (создать проект на https://supabase.com)
SUPABASE_URL=https://...supabase.co
SUPABASE_ANON_KEY=...

# GitHub (для парсера инвесторов)
GITHUB_TOKEN=ghp_...

# LinkedIn (опционально)
LINKEDIN_EMAIL=...
LINKEDIN_PASSWORD=...

# Email SMTP (SendGrid/AWS SES)
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=...

# Google Analytics
NEXT_PUBLIC_GA_ID=G-...
```

### Шаг 3: Создать базу данных в Supabase
1. Зайти в проект Supabase
2. Открыть SQL Editor
3. Скопировать содержимое `automations/config/database-schema.sql`
4. Выполнить

### Шаг 4: Запустить первый парсер (тест)
```bash
# Парсер вакансий HH.ru
npx ts-node automations/parsers/hh-rabota-parser.ts

# Должен вывести найденные вакансии и сохранить в БД
```

### Шаг 5: Настроить Telegram бота
```bash
# Первый запрос - авторизация
npx ts-node automations/bots/telegram-job-hunter.ts

# Введите код из Telegram при запросе
# Сохраните полученную строку сессии в .env.local
```

### Шаг 6: Запустить полную систему
```bash
# Все задачи по расписанию
npx ts-node automations/scheduler/cron-jobs.ts start
```

---

## 📊 КОНФИГУРАЦИЯ НАПРАВЛЕНИЙ

В файле `automations/config/directions.config.ts` настроены 4 направления:

### 1. Web3 / Blockchain
- **Поиск работы**: Web3 PM, Blockchain Developer, Solidity, Tokenomics
- **Поиск клиентов**: DeFi, NFT, DAO, RWA проекты
- **Цены**: MVP $15K+, Contracts $8K+, Consulting $500/ч
- **ЦА**: Web3 стартапы, крипто фонды, DAO

### 2. Web Development
- **Поиск работы**: Product Manager, Full Stack, React, Node.js
- **Поиск клиентов**: SaaS, E-commerce, Startups
- **Цены**: MVP $8K+, Full-cycle $20K+, Team $6K/мес
- **ЦА**: Технические стартапы, корпорации

### 3. Marketing & Advertising
- **Поиск работы**: Head of Marketing, CMO, Growth Manager
- **Поиск клиентов**: Startups, E-commerce, Brands
- **Цены**: Strategy $3K+, Branding $5K+, Campaign $2K+
- **ЦА**: Компании нуждающиеся в росте

### 4. Design & Creative
- **Поиск работы**: UX/UI Designer, Product Designer, Creative Director
- **Поиск клиентов**: Tech startups, Agencies
- **Цены**: UX/UI $4K+, Redesign $6K+, Design System $5K+
- **ЦА**: Продуктовые компании

---

## 📱 РЕКЛАМНЫЕ БЛОКИ (для друзей с пабликами)

Готовые HTML-файлы в `public/promo-blocks/`:

### Использование:
1. Открыть файл в браузере
2. Сделать скриншот (800x600)
3. Отправить другу с просьбой запостить
4. Или скопировать HTML для вставки в Telegram

### Конверсия:
- Telegram-посты: 2-5% CTR
- LinkedIn: 1-3% CTR
- Email: 20-40% open rate (при качественной базе)

---

## 🛡️ БЕЗОПАСНОСТЬ (Anti-Spam)

### Установленные лимиты:
- **Telegram**: 5 сообщений/час, 30/день
- **LinkedIn**: 20 коннектов/день
- **Email**: 50 писем/день (с warmup)
- **HH.ru**: 20 откликов/день

### Рекомендации:
1. Начинать с малого (10-20% от лимита)
2. Постепенно увеличивать
3. Мониторить блокировки
4. Иметь резервные аккаунты

---

## 📈 МОНИТОРИНГ

### SQL запросы для анализа:

```sql
-- Активные лиды по направлениям
SELECT * FROM active_leads_by_direction;

-- Лучшие вакансии (score > 80)
SELECT * FROM job_opportunities 
WHERE score > 80 AND status = 'new'
ORDER BY score DESC;

-- Статистика рассылок
SELECT 
  campaign_id,
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'replied' THEN 1 END) as replies
FROM outreach_messages
GROUP BY campaign_id;

-- AI-трафик на сайт
SELECT ai_referrer, COUNT(*) 
FROM website_visitors 
WHERE ai_referrer IS NOT NULL
GROUP BY ai_referrer;
```

---

## 🔄 РАСПИСАНИЕ (Scheduler)

| Задача | Частота | Описание |
|--------|---------|----------|
| hh-parser | Каждые 2 часа | Парсинг вакансий |
| telegram-hunter | Каждые 30 мин | Мониторинг чатов |
| linkedin-scout | Каждые 4 часа | Парсинг LinkedIn |
| email-followup | Ежедневно 10:00 | Проверка ответов |
| stats-report | Ежедневно 18:00 | Отчет о лидах |

---

## 🆘 ПОДДЕРЖКА

### Если что-то не работает:

1. **Ошибка авторизации Telegram**:
   - Удалить файл `session` в папке
   - Перезапустить, ввести код заново

2. **Rate limit на HH.ru**:
   - Увеличить задержки в коде
   - Использовать прокси
   - Снизить частоту запросов

3. **Письма попадают в спам**:
   - Настроить SPF/DKIM для домена
   - Уменьшить объем рассылок
   - Улучшить качество контента

4. **LinkedIn блокировка**:
   - Остановить на 48 часов
   - Снизить лимиты в 2 раза
   - Использовать резервный аккаунт

---

## 💡 ОПТИМИЗАЦИЯ

### Для увеличения конверсии:

1. **Персонализация**: Уникальные сообщения AI > шаблоны
2. **Скорость**: Отвечать на лиды за < 1 часа
3. **Follow-up**: 2-3 напоминания с интервалом 3-7 дней
4. **Социальное доказательство**: Упоминать кейсы
5. **Срочность**: Ограниченные предложения

---

## 📞 КОНТАКТЫ ДЛЯ ПОМОЩИ

При возникновении проблем:
1. Проверить логи в Supabase (таблица automation_tasks)
2. Проверить console output скриптов
3. Убедиться в правильности env переменных
4. Проверить лимиты API

---

**Готово к запуску! 🚀**

Время полной настройки: ~2-3 часа
Ожидаемый результат: 10-20 квалифицированных лидов/неделю
