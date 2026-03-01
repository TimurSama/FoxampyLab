# FRACTALIX.LAB — ПОЛНЫЙ АУДИТ И ДОРОЖНАЯ КАРТА РАЗВИТИЯ

**Дата аудита:** 18 февраля 2026  
**Версия проекта:** 1.0.4  
**Статус:** Production (требует доработок)  

---

## 📋 СОДЕРЖАНИЕ

1. [Что уже сделано](#что-уже-сделано)
2. [Архитектура проекта](#архитектура-проекта)
3. [Текущие проблемы](#текущие-проблемы)
4. [Анализ парсера (BOTPARS)](#анализ-парсера-botpars)
5. [Рекомендации по модернизации](#рекомендации-по-модернизации)
6. [План развития](#план-развития)
7. [Telegram Mini App](#telegram-mini-app)
8. [Бесплатный деплой](#бесплатный-деплой)

---

## ✅ ЧТО УЖЕ СДЕЛАНО

### Веб-приложение (Next.js 14)

**Главный сайт (`foxampylab.vercel.app`):**
- ✅ Иммерсивный landing page с 3D сферой (Three.js + React Three Fiber)
- ✅ Screen-based навигация (скролл переключает секции)
- ✅ Монохромный sci-fi дизайн (вдохновлен Blade Runner, Dune)
- ✅ Мультиязычность (i18n) — русский/английский
- ✅ Адаптивность для мобильных устройств
- ✅ Boot sequence анимация при загрузке
- ✅ Интерактивные визуализации:
  - InteractiveSphere (центральная сфера)
  - PointGlobe (глобус из точек)
  - TerrainGrid (топографическая сетка)
  - InkFluid backgrounds (жидкие фоны)

**Страницы:**
- ✅ `/` — Главная (Hero + 5 секций)
- ✅ `/services` — Услуги с пакетами (Starter/Professional/Enterprise)
- ✅ `/hub` — Портфолио проектов (Civilization Protocol, NexusVita, и др.)
- ✅ `/gallery` — Галерея кейсов
- ✅ `/research` — R&D исследования
- ✅ `/join` — Страница карьеры
- ✅ `/contact` — Форма контактов
- ✅ `/about` — О лаборатории

**Функциональность:**
- ✅ Форма записи на консультацию с календарем
- ✅ Unified Contact Form (модальное окно)
- ✅ Cookie Consent banner
- ✅ Google Analytics интеграция
- ✅ Performance-based адаптация (снижение качества на слабых устройствах)
- ✅ SEO оптимизация (structured data, meta tags)

### Telegram Бот

**Бот:** `@FoxampyLab_contact_bot`

**Функции:**
- ✅ Мультиязычный интерфейс (RU/EN)
- ✅ Запись на консультацию
- ✅ Заказ услуг (с выбором из 9 категорий)
- ✅ Обратная связь / контакты
- ✅ Партнерство (4 типа: стратегическое, техническое, инвестиции, креативное)
- ✅ Админ-панель (/admin) с просмотром заявок
- ✅ Уведомления администратору о новых заявках

**Режимы работы:**
- Polling (для локальной разработки)
- Webhook (для Vercel)

### Парсер инвесторов (BOTPARS)

**Архитектура:**
- 18+ коннекторов к источникам (Devpost, MLH, Eventbrite, Devfolio, и др.)
- Парсинг хакатонов → извлечение команд → контакты
- Lead scoring система
- Генерация email шаблонов
- Экспорт в CSV/JSON

**Статус:** ⚠️ НЕ РАБОТАЕТ (см. разбор ниже)

---

## 🏗 АРХИТЕКТУРА ПРОЕКТА

```
FoxampyLab/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Главная (Hero + секции)
│   ├── layout.tsx                # Root layout с провайдерами
│   ├── globals.css               # Глобальные стили
│   ├── services/                 # Страница услуг
│   ├── hub/                      # Портфолио проектов
│   ├── gallery/                  # Галерея кейсов
│   ├── research/                 # R&D
│   ├── join/                     # Карьера
│   ├── contact/                  # Контакты
│   └── projects/                 # Страницы отдельных проектов
│
├── components/
│   ├── visuals/                  # 3D компоненты (Three.js) (надо удалить весь 3д и заменить на 2д)
│   ├── backgrounds/              # Фоновые анимации переделать чтобы было красиво но легко
│   ├── sections/                 # Секции страниц
│   ├── layout/                   # Header, навигация
│   ├── forms/                    # Формы
│   ├── modals/                   # Модальные окна
│   ├── boot/                     # Boot sequence
│   └── interactive/              # Интерактивные элементы
│
├── lib/
│   ├── i18n/                     # Переводы (RU/EN)
│   ├── seo/                      # SEO метаданные
│   ├── bot/                      # Обработчики Telegram бота
│   ├── telegram.ts               # Сервис отправки в Telegram
│   └── context/                  # React контексты
│
├── bot/                          # Standalone Telegram бот
│   └── index.ts                  # Точка входа
│
├── BOTPARS/                      # Парсер инвесторов
│   ├── src/connectors/           # Коннекторы к источникам
│   ├── src/processing/           # Обработка данных
│   └── src/pipeline.ts           # Основной пайплайн
│
└── Документация:
    ├── plan.md                   # Мастер-план v2.0
    ├── DORABOTKI_LABORATORII.md  # Документ доработок
    ├── ОБНОВЛЕНИЕ.md             # План обновлений
    └── AUDIT_REPORT_TODO.md      # Технический аудит
```

---

## 🔴 ТЕКУЩИЕ ПРОБЛЕМЫ

### 1. Критические (Блокируют продажи)

| Проблема | Влияние | Решение |
|----------|---------|---------|
| **Формы не отправляются** на сервер | Заявки клиентов теряются | Подключить Telegram API + fallback |
| **Нет обработки ошибок** в формах | Пользователь не понимает, что произошло | Добавить ErrorBoundary + toast notifications |
| **3D тормозит на слабых устройствах** | 60%+ отказов с мобильных | Внедрить LOD + отключение 3D на мобильных |
| **Нет единого кабинета** | Нельзя отслеживать статус заявок | Создать личный кабинет (localStorage/Supabase) |

### 2. Важные (Снижают конверсию)

| Проблема | Влияние | Решение |
|----------|---------|---------|
| **Нет социальных доказательств** | и не будет (максимум можем подумать как переделать доделать страницу ветрина - она же кейсы)
| **Слабые CTA** | Низкая конверсия | Усилить призывы к действию |
| **Нет чата на сайте** | Уходят с вопросами | Интегрировать Telegram WebApp чат |
| **Парсер не работает** | Нет лидов инвесторов | Переписать на API-first подход |

### 3. Технические долги

```
❌ Нет тестов (Jest/Cypress)
❌ Нет CI/CD пайплайна
❌ Хардкод в некоторых местах
❌ Дублирование кода в компонентах
❌ Нет rate limiting на формах
```

---

## 🔍 АНАЛИЗ ПАРСЕРА (BOTPARS)

### Почему парсер не работает

**1. Защита от парсинга на целевых сайтах:**
```javascript
// Devpost, MLH и другие используют:
- Cloudflare защиту (проверка браузера)
- Rate limiting (блокировка IP)
- Динамическую подгрузку (SPA приложения)
- CAPTCHA при подозрительной активности
```

**2. Текущий подход устарел:**
```javascript
// Сейчас используется:
- Cheerio (HTML парсинг)
- Axios (HTTP запросы)
- Прокси (но нет ротации)

// Проблемы:
- HTML структура меняется
- JavaScript-rendered контент не виден
- Блокировка по User-Agent
- Нет обхода Cloudflare
```

**3. Нет обогащения данных:**
- Нет поиска по LinkedIn
- Нет верификации email
- Нет скоринга реальных инвесторов

### Решение: Новая архитектура парсера

```typescript
// 1. API-first подход (вместо парсинга HTML)
- Devpost API (если доступен)
- MLH API
- AngelList API / Crunchbase API
- LinkedIn Sales Navigator (через расширение)

// 2. Бесплатные источники данных:
- GitHub API (поиск по репозиториям)
- Product Hunt API
- Indie Hackers
- Reddit (r/SideProject, r/startups)

// 3. Альтернатива парсингу:
- Покупка готовых баз данных
- Партнерство с акселераторами
- Ручной сбор через VA (Virtual Assistant)
```

### Предлагаемая реализация нового парсера

```javascript
// Файл: lib/investor-finder/index.ts

interface InvestorProfile {
  name: string;
  company: string;
  role: 'angel' | 'vc' | 'corporate';
  focus: string[];
  stage: 'pre-seed' | 'seed' | 'series-a' | 'series-b';
  location: string;
  linkedin?: string;
  email?: string;
  telegram?: string;
  score: number; // 0-100
}

// Источники (бесплатные API):
const SOURCES = {
  // GitHub - поиск активных разработчиков
  github: {
    url: 'https://api.github.com/search/users',
    query: 'type:user followers:>1000 location:top-tech-cities',
  },
  
  // Product Hunt - создатели продуктов
  productHunt: {
    url: 'https://api.producthunt.com/v2/api/graphql',
    // Нужен API token (бесплатный)
  },
  
  // Crunchbase (free tier)
  crunchbase: {
    // Ограниченный доступ
  },
  
  // Ручной ввод через Telegram бота
  manual: {
    // Админ добавляет через бота
  }
};
```

---

## 💡 РЕКОМЕНДАЦИИ ПО МОДЕРНИЗАЦИИ

### 1. Сделать сайт ПРОДАЮЩИМ

**Главная страница:**
```
ДО (сейчас):
- Красивый дизайн
- Мало текста
- Слабые CTA

ПОСЛЕ (рекомендация):
- Hero с конкретной выгодой:
  "Запустим ваш блокчейн-проект за 90 дней
   от $15,000 под ключ"
  
- Социальное доказательство сразу:
  "Уже 12+ запущенных проектов
   $2M+ привлечено для клиентов"
   
- CTA выше:
  [Получить бесплатную консультацию] ( prominent )
  [Смотреть кейсы] ( secondary )
```

**Страница услуг:**
```
ДОБАВИТЬ:
- Пакеты с ценами (даже ориентировочными)
- Калькулятор стоимости
- Сравнение пакетов таблицей
- FAQ по каждой услуге
- "Что входит в работу" (чеклист)
```

**Страница проектов (Hub):**
```
ДОБАВИТЬ:
- Pitch deck для каждого проекта
- Roadmap с датами
- Прогноз ROI
- Кнопку "Инвестировать" (форму)
- Публичный трекер прогресса
```

### 2. Удалить лишнее

**Что убрать:**
```
❌ Варианты дизайна (app/variants/) — 6 неиспользуемых страниц
❌ Старые версии (app/services/page_old.tsx)
❌ Неиспользуемые компоненты (WireframeBubbles, MethodologyLayers)
❌ Отключенные пасхалки (HiddenRewards, Achievements) — вернуть позже
❌ Демо страницы (demo/background)
```

**Что объединить:**
```
- app/variants/ → удалить
- app/services/page_old.tsx → удалить
- Дублирующиеся модальные окна → объединить
```

### 3. Оптимизация производительности

```javascript
// 1. Отключить 3D на мобильных
const InteractiveSphere = dynamic(
  () => import('@/components/visuals/InteractiveSphere'),
  { 
    ssr: false,
    loading: () => <FallbackImage />,
  }
);

// 2. Lazy loading для тяжелых секций
const ServicesSection = dynamic(
  () => import('@/components/sections/ServicesSection'),
  { loading: () => <Skeleton /> }
);

// 3. Оптимизация шрифтов
// Использовать next/font вместо Google Fonts CDN

// 4. Кэширование
- ISR для статических страниц
- SWR для динамических данных
```

---

## 📅 ПЛАН РАЗВИТИЯ

### Фаза 1: Критические фиксы (1 неделя)

**Цель:** Сайт приносит заявки

```
□ Исправить отправку форм (Telegram + EmailJS fallback)
□ Добавить toast notifications
□ Убрать лишние страницы
□ Оптимизировать 3D для мобильных
□ Добавить Google Analytics goals
```

### Фаза 2: Продающий контент (2 недели)

**Цель:** Повысить конверсию

```
□ Переписать тексты на главной (с выгодами)
□ Добавить кейсы с результатами
□ Создать страницу "Для инвесторов"
□ Добавить отзывы (даже без имен)
□ Создать FAQ
```

### Фаза 3: Личный кабинет + Telegram Mini App (2-3 недели)

**Цель:** Удержание клиентов

```
□ Создать личный кабинет (Supabase + Auth)
□ Интегрировать с Telegram WebApp
□ Дашборд статуса проектов
□ Чат с командой внутри кабинета
□ Push-уведомления
```

### Фаза 4: Новый парсер инвесторов (2 недели)

**Цель:** Автоматический поиск лидов

```
□ Переписать парсер на API-first
□ Интеграция с GitHub API
□ Интеграция с Product Hunt
□ CRM для управления лидами
□ Автоматическая отправка писем
```

---

## 📱 TELEGRAM MINI APP

### Архитектура Mini App

```
┌─────────────────────────────────────────┐
│         Telegram App (iOS/Android)      │
│  ┌─────────────────────────────────────┐│
│  │     Foxampy Lab Mini App           ││
│  │  ┌───────────────────────────────┐ ││
│  │  │  WebView (Next.js app)        │ ││
│  │  │  - Личный кабинет             │ ││
│  │  │  - Просмотр проектов          │ ││
│  │  │  - Инвестиционные возможности │ ││
│  │  │  - Чат с командой             │ ││
│  │  └───────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
         ↕ WebApp API
┌─────────────────────────────────────────┐
│      Telegram Bot (@FoxampyLab_bot)     │
│  - Авторизация пользователя             │
│  - Уведомления                          │
│  - Быстрые ответы                       │
└─────────────────────────────────────────┘
```

### Функции Mini App

**Для клиентов:**
```
1. Авторизация через Telegram (без пароля)
2. Просмотр статуса проекта:
   - Этапы работы
   - Дедлайны
   - Оплаты
   - Документы
3. Общение с командой:
   - Чат
   - Файлы
   - Голосовые
4. Оплата услуг (крипта/карта через бота)
```

**Для инвесторов:**
```
1. Просмотр проектов лаборатории
2. Аналитика проектов (ROI, метрики)
3. Заявка на инвестирование (форма)
4. Портфель инвестиций
5. Новости и обновления проектов
```

### Техническая реализация

```typescript
// app/telegram/layout.tsx
import { TelegramWebAppProvider } from '@/lib/telegram/context';

export default function TelegramLayout({ children }) {
  return (
    <TelegramWebAppProvider>
      {children}
    </TelegramWebAppProvider>
  );
}

// lib/telegram/context.tsx
export function TelegramWebAppProvider({ children }) {
  const [user, setUser] = useState<TelegramUser | null>(null);
  
  useEffect(() => {
    // Инициализация Telegram WebApp SDK
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      setUser(tg.initDataUnsafe?.user);
      
      // Отправляем данные боту
      tg.MainButton.setText('Отправить заявку');
      tg.MainButton.onClick(() => {
        tg.sendData(JSON.stringify({ action: 'submit_lead' }));
      });
    }
  }, []);
  
  return (
    <TelegramContext.Provider value={{ user }}>
      {children}
    </TelegramContext.Provider>
  );
}
```

---

## 🚀 БЕСПЛАТНЫЙ ДЕПЛОЙ

### Структура развертывания

| Сервис | Использование | Стоимость |
|--------|---------------|-----------|
| **GitHub** | Хранение кода | Бесплатно |
| **Vercel** | Основной сайт + API | Бесплатно (Hobby) |
| **Render** | Telegram бот (24/7) | Бесплатно |
| **Supabase** | База данных + Auth | Бесплатно (500MB) |
| **Cloudflare** | CDN + DNS | Бесплатно |
| **Telegram** | Bot API + Mini App | Бесплатно |

### Настройка Vercel (основной сайт)

```bash
# 1. Подключить репозиторий к Vercel
# 2. Добавить переменные окружения:
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_ADMIN_ID=xxx
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=xxx
NEXT_PUBLIC_TELEGRAM_ADMIN_ID=xxx

# 3. Настроить домен (если есть)
# 4. Включить Analytics (бесплатно)
```

### Настройка Render (Telegram бот)

```yaml
# render.yaml
services:
  - type: web
    name: foxampy-bot
    runtime: node
    buildCommand: npm install && npm run build
    startCommand: npm run bot
    envVars:
      - key: TELEGRAM_BOT_TOKEN
        sync: false
      - key: TELEGRAM_ADMIN_ID
        sync: false
    plan: free
```

### Настройка Supabase (БД)

```sql
-- Таблицы для личного кабинета

-- Пользователи (связка с Telegram)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id BIGINT UNIQUE,
  email TEXT,
  name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'client', -- client, investor, admin
  created_at TIMESTAMP DEFAULT NOW()
);

-- Проекты
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name TEXT,
  status TEXT DEFAULT 'pending', -- pending, active, completed
  progress INTEGER DEFAULT 0,
  budget DECIMAL,
  deadline DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Заявки
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type TEXT, -- consultation, services, partnership, investment
  data JSONB,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Инвесторы (из парсера)
CREATE TABLE investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  company TEXT,
  role TEXT,
  focus TEXT[],
  stage TEXT[],
  location TEXT,
  linkedin TEXT,
  email TEXT,
  telegram TEXT,
  score INTEGER,
  source TEXT,
  contacted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎯 ИТОГОВЫЕ РЕКОМЕНДАЦИИ

### Приоритеты (по важности)

**Срочно (делать сейчас):**
1. ✅ Исправить отправку форм
2. ✅ Убрать лишние страницы
3. ✅ Оптимизировать для мобильных

**Важно (в течение месяца):**
4. Создать личный кабинет + Telegram Mini App
5. Переписать парсер инвесторов
6. Добавить социальное доказательство

**Желательно (по возможности):**
7. Добавить блог
8. Создать программу рефералов
9. Интегрировать с CRM

### Метрики успеха

```
До:
- Конверсия: ~0.5%
- Время на сайте: 1-2 мин
- Отказы: 70%

Цель (через 3 месяца):
- Конверсия: >3%
- Время на сайте: >4 мин
- Отказы: <40%
- Заявок в месяц: >20
- Инвесторов от парсера: >50/месяц
```

---

## 📞 СЛЕДУЮЩИЕ ШАГИ

**Что нужно от вас для начала работы:**

1. **Доступы:**
   - Telegram Bot Token
   - Vercel аккаунт
   - Supabase аккаунт
   - Домен (если есть)

2. **Контент:**
   - 3-5 реальных кейсов с результатами
   - Отзывы клиентов (даже без имен)
   - Фото/логотипы для портфолио

3. **Уточнения:**
   - Какие проекты открыты для инвестиций?
   - Какие услуги в приоритете?
   - Какая целевая аудитория инвесторов?

---

**Документ подготовлен:** 18.02.2026  
**Следующий шаг:** Утвердить приоритеты и начать с критических фиксов
