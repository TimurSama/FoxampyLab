# ПЛАН РЕСТРУКТУРИЗАЦИИ ПРОЕКТА

## Что есть сейчас

```
FoxampyLab/                          ← Текущий активный проект (Next.js 14)
├── app/                             ← App Router
├── components/                      ← React компоненты с 3D (Three.js)
├── lib/                             ← Утилиты, бот, i18n
├── bot/                             ← Telegram бот
├── BOTPARS/                         ← Старый парсер (не работает)
├── lib/investor-finder/             ← Новый парсер (GitHub API)
├── Fractalix.lab/                   ← Старая версия 1 (удалить)
├── Fractalix.lab.2/                 ← Старая версия 2 (удалить)
├── Fractalix.lab.3/                 ← Старая версия 3 (удалить)
└── *.md                             ← Куча документов
```

## Целевая структура

```
FoxampyLab/                          ← Root (монорепозиторий)
│
├── apps/
│   ├── website/                     ← Сайт (Next.js, 2D only)
│   │   ├── app/
│   │   ├── components/              ← 2D компоненты
│   │   ├── lib/
│   │   └── package.json
│   │
│   └── investor-scout/              ← Парсер инвесторов
│       ├── src/
│       ├── package.json
│       └── Dockerfile               ← Для Render.com
│
├── packages/
│   ├── ui/                          ← Общие 2D компоненты
│   ├── telegram-bot/                ← Общий код бота
│   └── shared-types/                ← Общие типы
│
├── infra/                           ← Инфраструктура
│   ├── docker-compose.yml
│   └── deploy-scripts/
│
└── docs/                            ← Документация

СТАРЫЕ ДИРЕКТОРИИ - УДАЛИТЬ:
├── Fractalix.lab/                   ← DELETE
├── Fractalix.lab.2/                 ← DELETE
├── Fractalix.lab.3/                 ← DELETE
└── BOTPARS/                         ← DELETE (заменен на investor-scout)
```

## Что делаем

### 1. Удалить мусор
```bash
rm -rf Fractalix.lab
rm -rf Fractalix.lab.2
rm -rf Fractalix.lab.3
rm -rf BOTPARS
```

### 2. Перенести текущий сайт в apps/website/
- Весь текущий код → apps/website/
- Убрать все 3D компоненты
- Сохранить дизайн в 2D

### 3. Создать apps/investor-scout/
- Новый парсер (lib/investor-finder/)
- Отдельный package.json
- Запуск через Render.com

---

## 2D ВЕРСИЯ ДИЗАЙНА (вместо 3D)

### Что заменяем

| Было (3D) | Станет (2D) |
|-----------|-------------|
| InteractiveSphere (Three.js) | CSS-анимация сферы (border-radius, transform) |
| PointGlobe | SVG или Canvas 2D с точками |
| TerrainGrid | CSS Grid + анимация высоты |
| InkFluidBackground | CSS gradients + backdrop-filter |
| Wireframe сфера | SVG circles + stroke-dasharray анимация |

### CSS-альтернативы

```css
/* Вместо Three.js сферы */
.sphere-2d {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #333, #000);
  border: 2px solid #444;
  animation: rotate 20s linear infinite;
}

/* Grid вместо terrain */
.grid-2d {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
}
.grid-cell {
  height: var(--height);
  background: linear-gradient(to top, #1a1a1c, transparent);
  transition: height 0.3s;
}

/* Жидкий фон */
.ink-fluid {
  background: 
    radial-gradient(ellipse at 20% 30%, rgba(30,30,35,0.8) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(20,20,25,0.6) 0%, transparent 40%);
  animation: fluid-move 15s ease-in-out infinite;
}
```

---

## ДОРОЖНАЯ КАРТА (3 месяца)

### МЕСЯЦ 1: ФУНДАМЕНТ

#### Неделя 1: Реструктуризация
- [ ] Удалить Fractalix.lab, Fractalix.lab.2, Fractalix.lab.3
- [ ] Создать структуру apps/website/ и apps/investor-scout/
- [ ] Перенести код сайта в apps/website/
- [ ] Настроить workspace (npm/pnpm workspaces)

#### Неделя 2: 2D Дизайн (часть 1)
- [ ] Заменить InteractiveSphere на CSS-анимацию
- [ ] Заменить InkFluid backgrounds на CSS gradients
- [ ] Убрать Three.js из зависимостей
- [ ] Проверить производительность (Lighthouse 90+)

#### Неделя 3: 2D Дизайн (часть 2)
- [ ] Заменить PointGlobe на SVG версию
- [ ] Заменить TerrainGrid на CSS Grid
- [ ] Сохранить все анимации (fade, slide, blur)

#### Неделя 4: Инфраструктура
- [ ] Настроить деплой apps/website на Vercel
- [ ] Создать Dockerfile для investor-scout
- [ ] Настроить Render.com для парсера
- [ ] Настроить Supabase (БД)

### МЕСЯЦ 2: ФУНКЦИОНАЛЬНОСТЬ

#### Неделя 1: Telegram Mini App
- [ ] Создать маршрут /telegram в apps/website
- [ ] Настроить Telegram WebApp SDK
- [ ] Сделать авторизацию через Telegram
- [ ] Создать личный кабинет (базовый)

#### Неделя 2: Личный кабинет
- [ ] Просмотр статуса проектов
- [ ] История заявок
- [ ] Уведомления
- [ ] Чат с командой (Telegram интеграция)

#### Неделя 3: Investor Scout (парсер)
- [ ] Деплой на Render.com
- [ ] Интеграция с GitHub API
- [ ] Автоматический поиск каждые 24ч
- [ ] Сохранение в Supabase

#### Неделя 4: Контент
- [ ] Переписать тексты на главной (продающие)
- [ ] Добавить кейсы с результатами
- [ ] Страница "Для инвесторов" с pitch deck
- [ ] FAQ

### МЕСЯЦ 3: ПРОДАЖИ И АВТОМАТИЗАЦИЯ

#### Неделя 1: CRM интеграция
- [ ] Создать таблицы в Supabase
- [ ] Воронка продаж
- [ ] Автоматические статусы
- [ ] Интеграция с Telegram ботом

#### Неделя 2: Email маркетинг
- [ ] Автоматические письма
- [ ] Шаблоны для инвесторов
- [ ] Шаблоны для клиентов
- [ ] Resend.com интеграция

#### Неделя 3: Аналитика
- [ ] Google Analytics события
- [ ] Конверсия по страницам
- [ ] Тепловые карты (Hotjar)
- [ ] A/B тестирование CTA

#### Неделя 4: Полировка
- [ ] Оптимизация скорости
- [ ] SEO аудит
- [ ] Мобильная версия
- [ ] Документация

---

## ТЕХНИЧЕСКИЕ ДЕТАЛИ

### Удаляем (3D → 2D)

```bash
# Удалить из package.json:
"@react-three/drei": "^9.122.0"
"@react-three/fiber": "^8.15.0"
"three": "^0.160.0"
"@types/three": "^0.160.0"

# Удалить компоненты:
rm components/visuals/InteractiveSphere.tsx
rm components/visuals/PointGlobe.tsx
rm components/visuals/TerrainGrid.tsx
rm components/visuals/WireframeBubbles.tsx
rm components/visuals/MethodologyLayers.tsx
rm components/backgrounds/InkFluid*.tsx
```

### Создаем (2D версии)

```
components/visuals-2d/
├── AnimatedSphere.tsx       # CSS-анимация вместо Three.js
├── PointGlobe2D.tsx         # SVG точки
├── TerrainGrid2D.tsx        # CSS Grid
├── InkFluid2D.tsx           # CSS gradients
└── WireframeSphere2D.tsx    # SVG circles
```

### Структура 2D сферы

```tsx
// components/visuals-2d/AnimatedSphere.tsx
export function AnimatedSphere() {
  return (
    <div className="relative w-64 h-64">
      {/* Внешнее кольцо */}
      <div className="absolute inset-0 rounded-full border border-white/20 animate-spin-slow" />
      
      {/* Среднее кольцо */}
      <div className="absolute inset-4 rounded-full border border-white/30 animate-spin-reverse" />
      
      {/* Внутренняя сфера */}
      <div className="absolute inset-8 rounded-full bg-gradient-radial from-white/10 to-transparent animate-pulse" />
      
      {/* Wireframe линии */}
      <svg className="absolute inset-0 w-full h-full animate-rotate">
        <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="50%" cy="50%" r="30%" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="5,5" />
      </svg>
    </div>
  );
}
```

---

## БЮДЖЕТ (бесплатно)

| Сервис | Использование | Стоимость |
|--------|---------------|-----------|
| GitHub | Репозиторий | $0 |
| Vercel | apps/website | $0 |
| Render | apps/investor-scout | $0 |
| Supabase | БД + Auth | $0 (500MB) |
| Cloudflare | CDN | $0 |
| Telegram | Bot + Mini App | $0 |
| Resend | Email (100/день) | $0 |

---

## ИТОГОВАЯ СТРУКТУРА ПОСЛЕ РЕСТРУКТУРИЗАЦИИ

```
FoxampyLab/
├── apps/
│   ├── website/                 ← Сайт (2D, Next.js)
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── visuals-2d/      ← 2D визуализации
│   │   │   ├── sections/
│   │   │   └── layout/
│   │   ├── lib/
│   │   │   ├── i18n/
│   │   │   ├── seo/
│   │   │   └── telegram/        ← Mini App интеграция
│   │   └── package.json
│   │
│   └── investor-scout/          ← Парсер (Node.js)
│       ├── src/
│       │   ├── sources/         ← GitHub, ProductHunt
│       │   ├── processing/
│       │   └── index.ts
│       ├── Dockerfile
│       └── package.json
│
├── packages/
│   ├── ui/                      ← Общие 2D компоненты
│   ├── telegram-bot/            ← Общий код бота
│   └── shared-types/            ← TypeScript типы
│
├── infra/
│   ├── docker-compose.yml
│   └── deploy/
│       ├── vercel.json
│       └── render.yaml
│
├── docs/
│   └── README.md
│
└── package.json                 ← Workspace root
```

---

## СЛЕДУЮЩИЙ ШАГ

Начать с **Недели 1 Месяца 1**: удалить старые директории и создать новую структуру.
