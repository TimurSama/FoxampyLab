# MIGRATION GUIDE: 3D → 2D + Реструктуризация

## Что сделано прямо сейчас

✅ Созданы 2D компоненты в `apps/website/components/visuals-2d/`
✅ Создан план реструктуризации
✅ Создан новый парсер в `lib/investor-finder/`

## Следующие шаги (выполнять по порядку)

### ШАГ 1: Удалить старые директории

```bash
# Сделать бэкап на всякий случай
mv Fractalix.lab /backup/
mv Fractalix.lab.2 /backup/
mv Fractalix.lab.3 /backup/
mv BOTPARS /backup/
```

### ШАГ 2: Перенести текущий сайт

```bash
# Создать временную копию
mkdir -p temp_website
cp -r app components lib public styles temp_website/

# Перенести в apps/website
mv temp_website/* apps/website/
rmdir temp_website
```

### ШАГ 3: Удалить 3D компоненты

```bash
rm -rf apps/website/components/visuals/
rm -rf apps/website/components/backgrounds/InkFluid*.tsx
```

### ШАГ 4: Заменить импорты

В файлах где используются 3D компоненты, заменить:

```typescript
// Было:
import InteractiveSphere from "@/components/visuals/InteractiveSphere";

// Стало:
import { AnimatedSphere } from "@/components/visuals-2d";
```

```typescript
// Было:
import GlobalBackground from "@/components/backgrounds/GlobalBackground";

// Стало:
import { InkFluid2D } from "@/components/visuals-2d";
```

### ШАГ 5: Обновить package.json

```json
{
  "dependencies": {
    "@react-three/drei": "...",     ← УДАЛИТЬ
    "@react-three/fiber": "...",    ← УДАЛИТЬ
    "three": "...",                 ← УДАЛИТЬ
    "..."
  }
}
```

```bash
npm uninstall @react-three/drei @react-three/fiber three
```

### ШАГ 6: Создать workspace

```json
// package.json (root)
{
  "name": "foxampy-lab",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspace=apps/website",
    "build": "npm run build --workspace=apps/website",
    "find-investors": "npm run start --workspace=apps/investor-scout"
  }
}
```

### ШАГ 7: Создать apps/investor-scout

```bash
mkdir -p apps/investor-scout/src
cd apps/investor-scout
npm init -y
```

```json
// apps/investor-scout/package.json
{
  "name": "@foxampy/investor-scout",
  "version": "1.0.0",
  "scripts": {
    "start": "tsx src/index.ts",
    "dev": "tsx watch src/index.ts"
  },
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

### ШАГ 8: Запуск

```bash
# Установить зависимости
npm install

# Запустить сайт
npm run dev

# Запустить парсер
npm run find-investors
```

## Итоговая структура

```
FoxampyLab/
├── apps/
│   ├── website/              ← Рабочий сайт (2D)
│   └── investor-scout/       ← Парсер
├── lib/
│   └── investor-finder/      ← Новый парсер (готов)
├── RESTRUCTURE_PLAN.md       ← План
├── MIGRATION_GUIDE.md        ← Этот файл
└── package.json              ← Workspace root
```

## Важно!

- НЕ удалять старые директории сразу - сначала бэкап
- Тестировать каждый шаг
- Проверять Lighthouse после миграции (должно быть 90+)
