# ✅ Чеклист настройки Vercel для Telegram бота

## 🔧 Шаг 1: Настройка переменных окружения в Vercel Dashboard

1. Перейдите в ваш проект на Vercel: https://vercel.com/dashboard
2. Откройте **Settings** → **Environment Variables**
3. Добавьте следующие переменные (для всех окружений: Production, Preview, Development):

```
TELEGRAM_BOT_TOKEN = 8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg
TELEGRAM_ADMIN_ID = 268494758
TELEGRAM_WEBHOOK_SECRET = (сгенерируйте случайную строку)
```

### Как сгенерировать TELEGRAM_WEBHOOK_SECRET:

**В PowerShell:**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Или онлайн:**
- https://randomkeygen.com/ (используйте "CodeIgniter Encryption Keys")
- https://www.random.org/strings/ (длина 32 символа)

**Пример:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

## 🚀 Шаг 2: Деплой проекта

1. В Vercel Dashboard нажмите **Deploy** (или подождите автоматического деплоя после push в GitHub)
2. Дождитесь завершения деплоя
3. Скопируйте URL вашего проекта (например: `https://foxampy-lab.vercel.app`)

## 🔗 Шаг 3: Настройка webhook для Telegram бота

После успешного деплоя настройте webhook:

### Вариант 1: Через скрипт (рекомендуется)

1. Создайте файл `.env.local` локально:
```env
TELEGRAM_BOT_TOKEN=8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg
TELEGRAM_ADMIN_ID=268494758
VERCEL_URL=https://foxampy-lab.vercel.app
TELEGRAM_WEBHOOK_SECRET=ваш_сгенерированный_секрет
```

2. Запустите скрипт:
```bash
npm run setup-webhook
```

### Вариант 2: Вручную через curl

Замените `YOUR_SECRET` и `YOUR_URL` на ваши значения:

```bash
curl -X POST "https://api.telegram.org/bot8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://foxampy-lab.vercel.app/api/telegram/webhook",
    "secret_token": "YOUR_SECRET"
  }'
```

## ✅ Шаг 4: Проверка работы

1. **Проверьте webhook:**
```bash
curl "https://api.telegram.org/bot8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg/getWebhookInfo"
```

Должен вернуть JSON с `"url": "https://foxampy-lab.vercel.app/api/telegram/webhook"`

2. **Проверьте API endpoint:**
Откройте в браузере: `https://foxampy-lab.vercel.app/api/telegram/webhook`

Должен вернуться JSON:
```json
{
  "status": "ok",
  "message": "Telegram webhook endpoint is active",
  "timestamp": "..."
}
```

3. **Протестируйте бота:**
- Найдите бота в Telegram: `@FoxampyLab_contact_bot`
- Отправьте `/start`
- Выберите язык и протестируйте форму
- Проверьте, что уведомление пришло вам (ID: 268494758)

## 🐛 Устранение проблем

### Проблема: Деплой не проходит / Логи пустые

1. **Проверьте переменные окружения:**
   - Убедитесь, что все 3 переменные добавлены в Vercel Dashboard
   - Проверьте, что они применены для всех окружений

2. **Проверьте Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Проверьте логи:**
   - Vercel Dashboard → Deployments → выберите деплой → Functions → Logs
   - Ищите ошибки компиляции или runtime ошибки

### Проблема: Webhook не работает

1. **Проверьте URL:**
   - Убедитесь, что URL правильный: `https://your-project.vercel.app/api/telegram/webhook`
   - Проверьте, что нет лишних слешей

2. **Проверьте secret token:**
   - Должен совпадать в Vercel и при настройке webhook

3. **Проверьте логи Vercel:**
   - Dashboard → Functions → Logs
   - Ищите ошибки обработки запросов

### Проблема: Бот не отвечает

1. **Проверьте переменные окружения:**
   - `TELEGRAM_BOT_TOKEN` должен быть правильным
   - `TELEGRAM_ADMIN_ID` должен быть вашим Telegram ID

2. **Проверьте, что администратор начал чат с ботом:**
   - Отправьте `/start` боту от вашего аккаунта (ID: 268494758)

3. **Проверьте логи:**
   - Vercel Dashboard → Functions → Logs
   - Ищите ошибки инициализации бота

## 📝 Важные замечания

- **Переменные окружения** должны быть настроены в Vercel Dashboard, НЕ в `vercel.json`
- **Webhook** нужно настроить ПОСЛЕ успешного деплоя
- **Secret token** опционален, но рекомендуется для безопасности
- **Уведомления** приходят вам напрямую в Telegram (ID: 268494758), отдельный чат создавать НЕ нужно

## 🎯 Итоговая последовательность

1. ✅ Добавить переменные окружения в Vercel Dashboard
2. ✅ Дождаться успешного деплоя
3. ✅ Настроить webhook через скрипт или вручную
4. ✅ Протестировать бота
5. ✅ Проверить получение уведомлений

---

**Готово!** После выполнения всех шагов ваш Telegram бот будет работать на Vercel. 🎉
