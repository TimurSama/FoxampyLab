# 🤖 Foxampy Lab Automations

Автоматизированная система поиска работы, клиентов и инвесторов.

## 📁 Структура

```
automations/
├── bots/           # Telegram боты и интеграции
├── parsers/        # Парсеры вакансий и лидов
├── outreach/       # Email и сообщения
├── scheduler/      # Планировщик задач
└── README.md       # Этот файл
```

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
cd FoxampyLab
npm install
```

### 2. Настройка окружения

Создай `.env.local`:

```env
# Telegram API (получить на my.telegram.org)
TELEGRAM_API_ID=your_api_id
TELEGRAM_API_HASH=your_api_hash
TELEGRAM_STRING_SESSION=your_session

# OpenAI
OPENAI_API_KEY=sk-...

# Supabase
SUPABASE_URL=https://...supabase.co
SUPABASE_ANON_KEY=your_key

# GitHub (для парсера инвесторов)
GITHUB_TOKEN=ghp_...

# Email SMTP
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=your_key

# Google Analytics
NEXT_PUBLIC_GA_ID=G-...
```

### 3. Запуск компонентов

#### Telegram Job Hunter
```bash
npx ts-node automations/bots/telegram-job-hunter.ts
```

Мониторит Telegram-чаты на вакансии, фильтрует AI, генерирует отклики.

#### HH.ru Parser
```bash
npx ts-node automations/parsers/hh-rabota-parser.ts
```

Парсит свежие вакансии с hh.ru и rabota.by.

#### Email Outreach
```bash
npx ts-node automations/outreach/email-sender.ts test
```

Генерация и отправка персонализированных писем.

#### Scheduler (все задачи)
```bash
npx ts-node automations/scheduler/cron-jobs.ts start
```

Запускает все задачи по расписанию.

## 📊 Расписание задач

| Задача | Частота | Описание |
|--------|---------|----------|
| `hh-parser` | Каждые 2 часа | Парсинг вакансий |
| `telegram-hunter` | Каждые 30 мин | Мониторинг чатов |
| `email-followup` | Ежедневно 10:00 | Проверка ответов |
| `stats-report` | Ежедневно 18:00 | Отчет о лидах |

## 🗄️ Структура базы данных (Supabase)

```sql
-- Лиды из Telegram
CREATE TABLE telegram_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat TEXT,
  message_id INTEGER,
  text TEXT,
  score INTEGER,
  reasoning TEXT,
  matched_skills TEXT[],
  recommendation TEXT,
  generated_reply TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Вакансии с HH
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
  cover_letter TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Отправленные email
CREATE TABLE sent_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  to_email TEXT,
  subject TEXT,
  body TEXT,
  template TEXT,
  tracking_id TEXT,
  opened BOOLEAN DEFAULT FALSE,
  replied BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP DEFAULT NOW()
);

-- Логи планировщика
CREATE TABLE scheduler_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_name TEXT,
  status TEXT,
  error TEXT,
  run_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 Использование

### Добавить новый чат для мониторинга

В `telegram-job-hunter.ts` добавь в `CHATS`:

```typescript
const CHATS = [
  '@pm_jobs',
  '@your_new_chat', // <-- добавить здесь
];
```

### Изменить параметры поиска

В `hh-rabota-parser.ts` отредактируй:

```typescript
const CONFIG = {
  queries: [
    { text: 'Product Manager', area: 16 },
    // добавить свои запросы
  ],
  minSalary: 2000,
};
```

### Создать новый шаблон email

В `email-sender.ts` добавь в `TEMPLATES`:

```typescript
myTemplate: {
  subject: (company) => `Subject for ${company}`,
  context: 'Описание контекста для AI',
}
```

## 📈 Мониторинг

### Просмотр лидов
```sql
SELECT * FROM telegram_leads 
WHERE score > 70 
ORDER BY created_at DESC;
```

### Статистика по задачам
```sql
SELECT task_name, status, COUNT(*) 
FROM scheduler_logs 
GROUP BY task_name, status;
```

## ⚠️ Важные замечания

1. **Rate limits**: HH API — 5000 запросов/час, GitHub — 5000/час
2. **Telegram**: Используй с задержками, чтобы не получить бан
3. **Email**: Не более 50 писем в день с одного IP
4. **GDPR**: Всегда получай согласие перед отправкой email

## 🔧 Деплой на сервер

### Render.com (бесплатно)

1. Создай Web Service
2. Укажи команду запуска: `npm run scheduler:start`
3. Добавь все env переменные
4. Используй Cron Job для периодических задач

### Локально с PM2

```bash
npm install -g pm2
pm2 start automations/scheduler/cron-jobs.ts --name foxampy-scheduler
pm2 save
pm2 startup
```

## 📞 Поддержка

При проблемах:
1. Проверь логи в `scheduler_logs`
2. Проверь rate limits API
3. Обнови сессию Telegram если истекла

---

**Автор**: Foxampy Lab
**Версия**: 1.0.0
