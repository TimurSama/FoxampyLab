#!/bin/bash

# ============================================================
# 🚀 БЫСТРЫЙ ЗАПУСК ВСЕЙ СИСТЕМЫ АВТОМАТИЗАЦИИ
# ============================================================
# Запуск: bash automations/setup-and-start.sh
# Время: ~5 минут (если .env.local уже настроен)
# ============================================================

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║       🦊 FOXAMPY LAB — СИСТЕМА АВТОМАТИЗАЦИИ              ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Проверка наличия .env.local
if [ ! -f ".env.local" ]; then
    echo "❌ Ошибка: файл .env.local не найден!"
    echo ""
    echo "Создай .env.local с переменными:"
    echo "  OPENAI_API_KEY=sk-..."
    echo "  SUPABASE_URL=https://..."
    echo "  SUPABASE_ANON_KEY=eyJ..."
    echo ""
    echo "См. подробности в: automations/config/SETUP_GUIDE.md"
    exit 1
fi

echo "✅ .env.local найден"
echo ""

# Установка зависимостей
echo "📦 Установка зависимостей..."
npm install telegram @supabase/supabase-js openai puppeteer cheerio node-cron dotenv nodemailer --silent 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Зависимости установлены"
else
    echo "⚠️ Некоторые зависимости уже установлены"
fi
echo ""

# Проверка структуры
echo "📁 Проверка структуры..."
DIRS=("automations/parsers" "automations/bots" "automations/outreach" "automations/scheduler" "public/promo-blocks")
for dir in "${DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "  ✅ $dir"
    else
        echo "  ❌ $dir не найден"
    fi
done
echo ""

# Проверка конфигурации
echo "⚙️ Проверка конфигурации..."
if [ -f "automations/config/directions.config.ts" ]; then
    DIRECTIONS=$(grep -c "id:" automations/config/directions.config.ts)
    echo "  ✅ Найдено $DIRECTIONS направления"
else
    echo "  ❌ Конфиг не найден"
fi
echo ""

# Показать что готово
echo "📊 ЧТО УЖЕ ГОТОВО:"
echo "  • 80 позиций для поиска работы (20 × 4 направления)"
echo "  • 59 категорий клиентов"
echo "  • 29 сервис-пакетов"
echo "  • 80 каналов продвижения"
echo "  • 4 CTA-блока для Telegram"
echo "  • 3 парсера (HH.ru, LinkedIn, Telegram)"
echo ""

# Меню выбора
while true; do
    echo "═══════════════════════════════════════════════════════════"
    echo "Выбери действие:"
    echo ""
    echo "  1) 🚀 Запустить HH.ru парсер (СНГ рынок)"
    echo "  2) 🚀 Запустить LinkedIn парсер (Международный)"
    echo "  3) 🚀 Запустить Telegram Job Hunter"
    echo "  4) 📤 Показать CTA-блоки для друзей"
    echo "  5) ⚡ Запустить ВСЁ по очереди"
    echo "  6) 📖 Открыть инструкцию"
    echo "  7) 🛑 Выход"
    echo ""
    read -p "Введи номер (1-7): " choice
    echo ""

    case $choice in
        1)
            echo "🚀 Запуск HH.ru парсера..."
            echo "   Поисковые запросы: Project Manager, Product Manager, Web3 PM..."
            echo ""
            npx ts-node automations/parsers/hh-rabota-parser.ts
            ;;
        2)
            echo "🚀 Запуск LinkedIn парсера..."
            echo "   ⚠️  При первом запуске откроется браузер — залогинься вручную"
            echo ""
            npx ts-node automations/parsers/linkedin-scout.ts
            ;;
        3)
            echo "🚀 Запуск Telegram Job Hunter..."
            echo "   Мониторинг 10+ чатов..."
            echo ""
            npx ts-node automations/parsers/telegram-job-hunter.ts
            ;;
        4)
            echo "📤 CTA-блоки для друзей:"
            echo ""
            echo "  1. Открой файлы в браузере:"
            for file in public/promo-blocks/*.html; do
                echo "     file://$(pwd)/$file"
            done
            echo ""
            echo "  2. Сделай скриншот каждого"
            echo "  3. Отправь друзьям с пабликами:"
            echo ""
            echo "     'Привет! Можешь запостить? Это мой студий — 10% тебе за клиента'"
            echo ""
            ;;
        5)
            echo "⚡ Последовательный запуск всех парсеров..."
            echo ""
            echo "Шаг 1/3: HH.ru парсер (2-3 мин)..."
            npx ts-node automations/parsers/hh-rabota-parser.ts
            echo ""
            echo "Шаг 2/3: LinkedIn парсер (5-10 мин)..."
            npx ts-node automations/parsers/linkedin-scout.ts
            echo ""
            echo "Шаг 3/3: Telegram Job Hunter..."
            npx ts-node automations/parsers/telegram-job-hunter.ts
            echo ""
            echo "✅ Все парсеры завершены!"
            ;;
        6)
            echo "📖 Открываю инструкцию..."
            if command -v cat &> /dev/null; then
                cat automations/config/SETUP_GUIDE.md
            else
                type automations/config/SETUP_GUIDE.md
            fi
            ;;
        7)
            echo "👋 До встречи!"
            echo ""
            echo "📊 Проверь результаты в Supabase:"
            echo "   https://supabase.com/dashboard/project/_/editor"
            exit 0
            ;;
        *)
            echo "❌ Неверный выбор. Попробуй 1-7."
            ;;
    esac
    echo ""
    read -p "Нажми Enter для продолжения..."
    echo ""
done
