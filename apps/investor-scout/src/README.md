# Investor Finder — Поиск инвесторов и лидов

## Архитектура (новая)

Вместо парсинга HTML (который блокируется), используем:
1. **GitHub API** — поиск активных разработчиков и проектов
2. **Product Hunt API** — создатели продуктов
3. **LinkedIn** — ручной ввод + расширение
4. **Ручное добавление** — через Telegram бота

## Источники данных

### 1. GitHub API (бесплатно, 5000 req/hour)
- Поиск по популярным репозиториям
- Поиск по организациям
- Поиск по разработчикам

### 2. Product Hunt (требует API Key, бесплатный)
- Топовые продукты
- Создатели
- Комментаторы

### 3. Ручной ввод
- Админ добавляет через Telegram бота
- Импорт из CSV

## Установка

```bash
# Добавить в .env.local:
GITHUB_TOKEN=ghp_xxx           # GitHub Personal Access Token
PRODUCT_HUNT_TOKEN=xxx         # Product Hunt API Token
SUPABASE_URL=xxx               # Supabase URL
SUPABASE_ANON_KEY=xxx          # Supabase Anon Key
```
