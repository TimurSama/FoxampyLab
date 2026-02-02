# Настройка Telegram бота для GitHub Pages

## Шаг 1: Добавление секретов в GitHub

Чтобы Telegram бот работал на GitHub Pages, нужно добавить переменные окружения в настройки репозитория:

1. Откройте ваш репозиторий на GitHub: `https://github.com/TimurSama/FoxampyLab`

2. Перейдите в **Settings** → **Secrets and variables** → **Actions**

3. Нажмите **New repository secret** и добавьте следующие секреты:

### Секреты для добавления:

**NEXT_PUBLIC_TELEGRAM_BOT_TOKEN**
```
8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg
```

**NEXT_PUBLIC_TELEGRAM_ADMIN_ID**
```
268494758
```

**NEXT_PUBLIC_SITE_URL**
```
https://timursama.github.io/FoxampyLab
```

## Шаг 2: Обновление GitHub Actions workflow

Файл `.github/workflows/deploy.yml` уже настроен для использования этих переменных.

Проверьте, что в нём есть секция:

```yaml
env:
  NEXT_PUBLIC_TELEGRAM_BOT_TOKEN: ${{ secrets.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN }}
  NEXT_PUBLIC_TELEGRAM_ADMIN_ID: ${{ secrets.NEXT_PUBLIC_TELEGRAM_ADMIN_ID }}
  NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
```

## Шаг 3: Проверка работы бота

### Локальная проверка:

1. Убедитесь, что файл `.env.local` создан с правильными данными
2. Перезапустите dev-сервер: `npm run dev`
3. Заполните форму консультации на сайте
4. Проверьте, что сообщение пришло в Telegram

### Проверка на GitHub Pages:

1. Сделайте commit и push изменений
2. Дождитесь завершения GitHub Actions
3. Откройте сайт и заполните форму
4. Проверьте Telegram

## Как работает интеграция

### Отправка сообщений:

Когда пользователь заполняет форму консультации:

1. Данные формы собираются на клиенте
2. Вызывается `TelegramService.formatConsultationMessage()`
3. Форматированное сообщение отправляется через Telegram Bot API
4. Сообщение приходит напрямую вам в Telegram (ID: 268494758)

### Формат сообщения:

```
📅 НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ

👤 Клиент: Иван Иванов
📧 Email: ivan@example.com
📱 Телефон: +7 999 123-45-67
📅 Дата: 15.02.2026
⏰ Время: 14:00

📝 Сообщение: Хочу обсудить разработку Web3 проекта

Заявка отправлена с сайта Foxampy Lab
```

## Безопасность

⚠️ **ВАЖНО**: 
- Никогда не коммитьте `.env.local` в Git
- Файл `.env.local` уже добавлен в `.gitignore`
- Используйте GitHub Secrets для production
- Токен бота имеет доступ только к отправке сообщений

## Troubleshooting

### Сообщения не приходят:

1. Проверьте, что секреты добавлены в GitHub
2. Проверьте логи GitHub Actions
3. Убедитесь, что бот активен (напишите ему `/start` в Telegram)
4. Проверьте консоль браузера на ошибки

### Ошибка "Telegram bot credentials not configured":

- Проверьте наличие переменных окружения
- Перезапустите dev-сервер
- Проверьте, что `.env.local` существует

### Ошибка "Telegram API Error":

- Проверьте правильность токена бота
- Убедитесь, что бот не заблокирован
- Проверьте, что ID администратора правильный

## Дополнительные возможности

### Добавление команд боту:

Вы можете настроить команды для бота через @BotFather:

```
/start - Начать работу с ботом
/help - Помощь
/status - Статус заявок
```

### Расширение функционала:

В будущем можно добавить:
- Кнопки для быстрых ответов
- Автоматическую отправку подтверждения клиенту
- Интеграцию с CRM
- Статистику заявок
- Напоминания о встречах

## Контакты

Если возникли вопросы по настройке:
- Telegram: @TimurSama
- Email: admin@foxampy.com
