# 🚀 Быстрый старт: Telegram бот для заказов

## ⚡ Быстрая настройка (5 минут)

### 1. Начните чат с ботом (ОБЯЗАТЕЛЬНО!)

1. Откройте Telegram
2. Найдите бота: `@FoxampyLab_contact_bot`
3. Нажмите **"Start"** или отправьте `/start`
4. ✅ Готово! Теперь бот может отправлять вам уведомления

### 2. Локальная настройка

Создайте файл `.env.local` в корне проекта:

```bash
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg
NEXT_PUBLIC_TELEGRAM_ADMIN_ID=268494758
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Перезапустите сервер

```bash
npm run dev
```

### 4. Проверьте работу

1. Откройте `http://localhost:3000`
2. Заполните форму консультации (кнопка календаря внизу слева)
3. Отправьте заявку
4. ✅ Проверьте Telegram - должно прийти уведомление!

---

## 🌐 Настройка для Production (GitHub Pages)

### 1. Добавьте секреты в GitHub

1. Откройте: `https://github.com/TimurSama/FoxampyLab/settings/secrets/actions`
2. Нажмите **"New repository secret"** для каждого:

**Секрет 1:**
- Name: `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN`
- Value: `8224553051:AAGhMoyvUojdI5Mzli2D7LWlkMr_Xah4Deg`

**Секрет 2:**
- Name: `NEXT_PUBLIC_TELEGRAM_ADMIN_ID`
- Value: `268494758`

**Секрет 3:**
- Name: `NEXT_PUBLIC_SITE_URL`
- Value: `https://timursama.github.io/FoxampyLab`

### 2. Проверьте автодеплой

GitHub Actions workflow уже настроен! Просто:
1. Сделайте commit и push
2. Дождитесь завершения деплоя
3. Проверьте работу на production сайте

---

## ✅ Чеклист

- [ ] Начат чат с ботом (`/start`)
- [ ] Создан `.env.local` с правильными значениями
- [ ] Перезапущен dev-сервер
- [ ] Протестирована отправка заявки локально
- [ ] Добавлены секреты в GitHub
- [ ] Протестирована отправка заявки на production

---

## 📚 Подробная инструкция

См. [TELEGRAM_BOT_SETUP.md](./TELEGRAM_BOT_SETUP.md) для полной документации.

---

## 🔧 Проблемы?

**Сообщения не приходят?**
1. ✅ Начали ли вы чат с ботом? (`/start`)
2. ✅ Правильный ли токен в `.env.local`?
3. ✅ Перезапустили ли сервер после изменения `.env.local`?

**Ошибка "credentials not configured"?**
1. Проверьте наличие файла `.env.local`
2. Проверьте правильность названий переменных
3. Перезапустите сервер

---

**Готово! 🎉**
