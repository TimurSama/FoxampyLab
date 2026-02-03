# 🤖 Настройка Telegram бота на Vercel

Это руководство описывает процесс настройки Telegram бота для работы на Vercel через webhook.

## 📋 Архитектура

### Как это работает:

1. **Vercel Serverless Functions** - обрабатывают webhook запросы от Telegram
   - API route: `/api/telegram/webhook`
   - Автоматически масштабируется
   - Не требует отдельного сервера

2. **Telegram Bot** - отправляет обновления на webhook URL
   - Все сообщения и команды обрабатываются через webhook
   - Не требует постоянно запущенного процесса

3. **Администратор** - получает все заявки в Telegram

---

## 🚀 Быстрая настройка

### Шаг 1: Подготовка проекта

1. **Убедитесь, что зависимости установлены:**
   ```bash
   npm install
   ```

2. **Проверьте структуру проекта:**
   - `app/api/telegram/webhook/route.ts` - API route для webhook
   - `lib/bot/handler.ts` - логика обработки сообщений
   - `lib/bot/webhook.ts` - утилиты для настройки webhook

### Шаг 2: Настройка переменных окружения в Vercel

1. **Перейдите в настройки проекта на Vercel:**
   - Settings → Environment Variables

2. **Добавьте следующие переменные:**

   ```
   TELEGRAM_BOT_TOKEN=8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg
   TELEGRAM_ADMIN_ID=268494758
   TELEGRAM_WEBHOOK_SECRET=ваш_секретный_токен_для_безопасности
   ```

   **Важно:**
   - `TELEGRAM_WEBHOOK_SECRET` - опциональный, но рекомендуется для безопасности
   - Можно сгенерировать случайную строку: `openssl rand -hex 32`

3. **Примените переменные для всех окружений:**
   - Production
   - Preview
   - Development

### Шаг 3: Деплой на Vercel

1. **Подключите репозиторий к Vercel:**
   ```bash
   # Если еще не подключен
   vercel
   ```

2. **Или через GitHub интеграцию:**
   - Перейдите на vercel.com
   - Import Project → выберите репозиторий
   - Настройте переменные окружения
   - Deploy

3. **После деплоя получите URL вашего проекта:**
   - Например: `https://foxampy-lab.vercel.app`

### Шаг 4: Настройка webhook

После деплоя на Vercel нужно настроить webhook для Telegram бота.

#### Вариант 1: Автоматическая настройка (рекомендуется)

1. **Установите URL вашего проекта:**
   ```bash
   export VERCEL_URL=https://foxampy-lab.vercel.app
   export TELEGRAM_BOT_TOKEN=8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg
   export TELEGRAM_WEBHOOK_SECRET=ваш_секретный_токен
   ```

2. **Запустите скрипт настройки:**
   ```bash
   npm run setup-webhook
   ```

#### Вариант 2: Ручная настройка через API

1. **Откройте терминал и выполните:**
   ```bash
   curl -X POST "https://api.telegram.org/bot8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{
       "url": "https://foxampy-lab.vercel.app/api/telegram/webhook",
       "secret_token": "ваш_секретный_токен"
     }'
   ```

2. **Проверьте установку:**
   ```bash
   curl "https://api.telegram.org/bot8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg/getWebhookInfo"
   ```

#### Вариант 3: Через скрипт setup-webhook

1. **Создайте `.env.local` с переменными:**
   ```env
   TELEGRAM_BOT_TOKEN=8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg
   TELEGRAM_ADMIN_ID=268494758
   TELEGRAM_WEBHOOK_URL=https://foxampy-lab.vercel.app/api/telegram/webhook
   TELEGRAM_WEBHOOK_SECRET=ваш_секретный_токен
   ```

2. **Запустите скрипт:**
   ```bash
   npm run setup-webhook
   ```

### Шаг 5: Проверка работы

1. **Откройте Telegram и найдите бота:**
   - `@FoxampyLab_contact_bot`

2. **Отправьте команду `/start`**

3. **Выберите язык и протестируйте функции:**
   - Запись на консультацию
   - Заказ услуг
   - Связаться с нами

4. **Проверьте, что уведомления приходят администратору:**
   - Все заявки должны приходить в ваш Telegram (ID: 268494758)

---

## 🔧 Конфигурация

### vercel.json

Файл `vercel.json` уже настроен для работы с API routes:

```json
{
  "functions": {
    "app/api/telegram/webhook/route.ts": {
      "maxDuration": 30
    }
  }
}
```

### next.config.js

Конфигурация автоматически определяет, используется ли Vercel, и отключает статический экспорт для поддержки API routes:

```javascript
// Для Vercel не используем статический экспорт (нужны API routes)
// Для GitHub Pages используем статический экспорт
...(process.env.VERCEL ? {} : { output: 'export' }),
```

---

## 🔐 Безопасность

### Secret Token

Для дополнительной безопасности рекомендуется использовать `TELEGRAM_WEBHOOK_SECRET`:

1. **Сгенерируйте случайный токен:**
   ```bash
   openssl rand -hex 32
   ```

2. **Установите в Vercel:**
   - Settings → Environment Variables
   - `TELEGRAM_WEBHOOK_SECRET=сгенерированный_токен`

3. **Используйте при настройке webhook:**
   ```bash
   curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{
       "url": "https://your-domain.vercel.app/api/telegram/webhook",
       "secret_token": "ваш_секретный_токен"
     }'
   ```

API route автоматически проверяет этот токен при получении запросов.

---

## 🐛 Устранение неполадок

### Проблема: Webhook не работает

1. **Проверьте URL webhook:**
   ```bash
   curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"
   ```

2. **Проверьте, что API route доступен:**
   ```bash
   curl https://your-domain.vercel.app/api/telegram/webhook
   ```
   Должен вернуть: `{"status":"ok","message":"Telegram webhook endpoint is active"}`

3. **Проверьте логи Vercel:**
   - Dashboard → Deployments → выберите деплой → Functions → Logs

### Проблема: Бот не отвечает

1. **Проверьте переменные окружения в Vercel:**
   - Убедитесь, что `TELEGRAM_BOT_TOKEN` и `TELEGRAM_ADMIN_ID` установлены

2. **Проверьте, что администратор начал чат с ботом:**
   - Отправьте `/start` боту от имени администратора

3. **Проверьте логи:**
   - Vercel Dashboard → Functions → Logs

### Проблема: Ошибка "Unauthorized"

1. **Проверьте `TELEGRAM_WEBHOOK_SECRET`:**
   - Должен совпадать в Vercel и при настройке webhook

2. **Переустановите webhook с правильным secret token**

---

## 📊 Мониторинг

### Логи Vercel

Все запросы к webhook логируются в Vercel Dashboard:
- Dashboard → Deployments → Functions → Logs

### Проверка статуса webhook

```bash
curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"
```

Ответ покажет:
- URL webhook
- Количество pending updates
- Последние ошибки (если есть)

---

## 🔄 Обновление webhook

Если вы изменили URL проекта или хотите обновить webhook:

1. **Удалите старый webhook:**
   ```bash
   curl -X POST "https://api.telegram.org/bot<TOKEN>/deleteWebhook?drop_pending_updates=true"
   ```

2. **Установите новый:**
   ```bash
   npm run setup-webhook
   ```

---

## 📝 Примечания

- **Vercel Serverless Functions** имеют ограничение времени выполнения (по умолчанию 10 секунд, для webhook установлено 30 секунд)
- **Хранилище данных пользователей** использует `Map` в памяти - при каждом cold start данные теряются. Для production рекомендуется использовать базу данных (например, Vercel KV, MongoDB, PostgreSQL)
- **GitHub Pages** не поддерживает API routes, поэтому для GitHub Pages используйте отдельный сервер для бота (Railway, Heroku, VPS)

---

## 🆚 Сравнение: Vercel vs Standalone сервер

| Параметр | Vercel (Webhook) | Standalone (Polling) |
|----------|------------------|----------------------|
| Стоимость | Бесплатно (Hobby) | Требует сервер |
| Масштабируемость | Автоматическая | Ручная |
| Простота настройки | Средняя | Простая |
| Хранение данных | Требует БД | Может использовать память |
| Поддержка API routes | ✅ | ❌ |
| Поддержка GitHub Pages | ❌ | ✅ |

---

## 📚 Дополнительные ресурсы

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Webhooks](https://core.telegram.org/bots/api#setwebhook)

---

**Готово!** Ваш Telegram бот теперь работает на Vercel через webhook. 🎉
