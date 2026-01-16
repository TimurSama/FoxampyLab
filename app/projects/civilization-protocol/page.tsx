"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import { X, Network, Users, Box, Database, Shield, Zap, Globe, Code, Layers } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ArchitectureVisualization from '@/components/visuals/ArchitectureVisualization';

// Детальные данные для каждого блока
const architectureBlocks = [
  {
    id: 'platform-architecture',
    title: 'Архитектура платформы',
    description: '12-уровневая кибер-физическая архитектура для управления водными ресурсами',
    detailedDescription: `**12-уровневая архитектура CivilizationProtocol**

CivilizationProtocol представляет собой комплексную кибер-физическую систему для управления водными ресурсами через блокчейн. Архитектура спроектирована для обеспечения масштабируемости, безопасности и децентрализации.

**Уровень 1: Физический слой**
- IoT датчики качества воды (pH, температура, химический состав)
- Расходомеры и счетчики воды
- Датчики уровня воды в резервуарах
- Метеорологические станции
- Спутниковые данные

**Уровень 2: Сетевой слой**
- LoRaWAN для дальних расстояний
- 5G/4G для высокоскоростной передачи
- Mesh сети для отдаленных локаций
- Протоколы безопасности (TLS, VPN)

**Уровень 3: Блокчейн слой**
- Ethereum Mainnet (основная сеть)
- Polygon (масштабирование транзакций)
- Everscale (высокая скорость обработки)
- Cross-chain мосты для взаимодействия

**Уровень 4: Смарт-контракты**
- VODeco токен (управляющий токен)
- VOD токен (утилитарный токен)
- Контракты токенизации водных ресурсов
- Стейкинг и фарминг контракты
- Автоматизированные выплаты

**Уровень 5: DAO управление**
- Голосование по предложениям
- Управление казначейством
- Выбор валидаторов
- Изменение параметров протокола
- Финансирование проектов

**Уровень 6: AI/ML слой**
- Прогнозирование качества воды
- Анализ трендов потребления
- Обнаружение аномалий
- Оптимизация распределения ресурсов
- Персонализированные рекомендации

**Уровень 7: API Gateway**
- RESTful API для интеграций
- GraphQL для гибких запросов
- WebSocket для real-time данных
- OAuth 2.0 аутентификация
- Rate limiting и квоты

**Уровень 8: Frontend приложения**
- Веб-приложение (React, Next.js)
- Мобильные приложения (iOS, Android)
- Дашборды для аналитики
- Порталы для различных ролей
- PWA для офлайн работы

**Уровень 9: Маркетплейс**
- Торговля данными о воде
- Лицензирование данных
- Продажа токенизированных ресурсов
- Аукционы водных прав
- Рынок деривативов

**Уровень 10: Инвестиционная платформа**
- Стейкинг VODeco токенов
- Yield farming программы
- Инвестирование в проекты
- Дивиденды от доходов платформы
- NFT водных проектов

**Уровень 11: Экосистемные сервисы**
- Интеграция с партнерскими платформами
- Плагины для сторонних разработчиков
- SDK для создания приложений
- Белые метки для корпораций
- Консалтинговые услуги

**Уровень 12: Глобальная сеть**
- Международные стандарты данных
- Мультиязычная поддержка
- Региональные узлы
- Межгосударственные соглашения
- Глобальная координация`,
    icon: <Layers className="w-8 h-8" />,
    color: '#00F0FF',
  },
  {
    id: 'objects',
    title: 'Объекты платформы',
    description: 'Физические и цифровые объекты экосистемы',
    detailedDescription: `**Физические объекты:**
- Водные ресурсы (реки, озера, подземные воды)
- Инфраструктура (водопроводы, очистные сооружения)
- IoT устройства (датчики качества воды, расходомеры)
- Энергетические объекты (ГЭС, солнечные панели)

**Цифровые объекты:**
- Токенизированные водные ресурсы (NFT водных прав)
- Данные мониторинга (исторические и реального времени)
- Смарт-контракты (автоматизация управления)
- Цифровые активы (VODeco, VOD токены)`,
    icon: <Box className="w-8 h-8" />,
    color: '#7000FF',
  },
  {
    id: 'subjects',
    title: 'Субъекты платформы',
    description: 'Участники и роли в экосистеме',
    detailedDescription: `**Основные субъекты:**

1. **Владельцы водных ресурсов**
   - Муниципалитеты
   - Частные компании
   - Сельскохозяйственные кооперативы

2. **Инвесторы**
   - Институциональные инвесторы
   - Частные лица
   - DAO фонды

3. **Потребители данных**
   - Исследовательские институты
   - Экологические организации
   - Бизнес-аналитики

4. **Разработчики**
   - Создатели приложений
   - Интеграторы систем
   - Консультанты

5. **Валидаторы**
   - Ноды блокчейна
   - Оракулы данных
   - Аудиторы`,
    icon: <Users className="w-8 h-8" />,
    color: '#00F0FF',
  },
  {
    id: 'products',
    title: 'Продукты экосистемы',
    description: 'Основные продукты и сервисы платформы',
    detailedDescription: `**Основные продукты:**

1. **VODeco Platform**
   - Децентрализованное управление водными ресурсами
   - DAO голосование и финансирование проектов
   - Токенизация водных прав

2. **VOD Token**
   - Утилитарный токен для оплаты услуг
   - Стейкинг и фарминг вознаграждений
   - Голосование в DAO

3. **Water Data Marketplace**
   - Торговля данными о воде
   - Лицензирование данных
   - API доступ к данным

4. **Investment Platform**
   - Инвестирование в водные проекты
   - Стейкинг токенов
   - Yield farming

5. **IoT Monitoring Suite**
   - Реал-тайм мониторинг качества воды
   - Алерты и уведомления
   - Историческая аналитика

6. **Mobile Applications**
   - Приложения для граждан
   - Приложения для бизнеса
   - Приложения для исследователей`,
    icon: <Zap className="w-8 h-8" />,
    color: '#7000FF',
  },
  {
    id: 'projects',
    title: 'Проекты экосистемы',
    description: 'Активные и планируемые проекты',
    detailedDescription: `**Активные проекты:**

1. **VODeco Water Management System**
   - Статус: Phase 2 (в разработке)
   - Инвестиции: $250K из $1.15M
   - Прогресс: 22%

2. **Global Water Data Network**
   - Статус: Phase 1 (MVP)
   - Интеграция с 50+ датчиками
   - Покрытие: 12 стран

3. **DAO Governance Platform**
   - Статус: Beta
   - Активных участников: 1,200+
   - Принято решений: 45

**Планируемые проекты:**

4. **Water Rights Tokenization**
   - Статус: Planning
   - Ожидаемый запуск: Q2 2025

5. **AI Water Quality Predictor**
   - Статус: R&D
   - Партнерство с университетами

6. **Cross-Chain Bridge**
   - Статус: Planning
   - Интеграция: Ethereum ↔ Polygon ↔ Everscale`,
    icon: <Globe className="w-8 h-8" />,
    color: '#00F0FF',
  },
  {
    id: 'infrastructure',
    title: 'Инфраструктура',
    description: 'Техническая инфраструктура платформы',
    detailedDescription: `**Блокчейн инфраструктура:**
- Ethereum Mainnet (основная сеть)
- Polygon (масштабирование)
- Everscale (высокая скорость)
- IPFS (децентрализованное хранение)

**Вычислительная инфраструктура:**
- AWS / Azure (облачные сервисы)
- Kubernetes (оркестрация)
- Docker (контейнеризация)
- Redis (кэширование)

**Базы данных:**
- PostgreSQL (основные данные)
- MongoDB (временные данные)
- InfluxDB (IoT метрики)
- Elasticsearch (поиск и аналитика)

**Безопасность:**
- Multi-signature кошельки
- Аудит смарт-контрактов
- DDoS защита
- Шифрование данных`,
    icon: <Database className="w-8 h-8" />,
    color: '#7000FF',
  },
];

// Компонент модального окна
function DetailModal({ block, isOpen, onClose }: { block: typeof architectureBlocks[0] | null; isOpen: boolean; onClose: () => void }) {
  if (!block) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-32 bg-[#050505] border border-[#00F0FF]/30 z-50 overflow-y-auto max-h-[90vh]"
          >
            <div className="p-4 md:p-8 lg:p-12">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-[#00F0FF] hover:text-[#00F0FF]/80 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div style={{ color: block.color }}>
                    {block.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-mono text-[#E0E0E0]">
                    {block.title}
                  </h2>
                </div>
                <p className="font-mono text-sm text-[#E0E0E0]/60 mb-6">
                  {block.description}
                </p>
              </div>

              <div className="max-w-none">
                <div className="font-mono text-sm md:text-base text-[#E0E0E0] leading-relaxed">
                  {block.detailedDescription.split('\n\n').map((paragraph, i) => {
                    // Проверяем, является ли параграф заголовком
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={i} className="text-xl md:text-2xl text-[#00F0FF] font-semibold mb-4 mt-6 first:mt-0">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    
                    // Обычный параграф
                    return (
                      <div key={i} className="mb-4">
                        {paragraph.split('\n').map((line, j) => {
                          // Заголовок уровня 2
                          if (line.startsWith('**') && line.endsWith('**') && line.length < 50) {
                            return (
                              <h4 key={j} className="text-lg md:text-xl text-[#00F0FF] font-semibold mb-2 mt-4">
                                {line.replace(/\*\*/g, '')}
                              </h4>
                            );
                          }
                          // Список
                          if (line.trim().startsWith('- ')) {
                            return (
                              <div key={j} className="ml-4 md:ml-6 mb-2 text-[#E0E0E0]/90">
                                • {line.substring(2).trim()}
                              </div>
                            );
                          }
                          // Нумерованный список
                          if (/^\d+\.\s/.test(line.trim())) {
                            return (
                              <div key={j} className="ml-4 md:ml-6 mb-2 text-[#E0E0E0]/90">
                                {line.trim()}
                              </div>
                            );
                          }
                          // Обычный текст
                          if (line.trim()) {
                            return (
                              <p key={j} className="mb-2 text-[#E0E0E0]/80">
                                {line}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Компонент визуализации для блока
function BlockVisualization({ type, color }: { type: string; color: string }) {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1} color={color} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color={color} />
          <ArchitectureVisualization 
            type={type as any} 
            color={color} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function CivilizationProtocolPage() {
  const [selectedBlock, setSelectedBlock] = useState<typeof architectureBlocks[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBlockClick = (block: typeof architectureBlocks[0]) => {
    setSelectedBlock(block);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E0E0E0] overflow-x-hidden">
      <Header />
      
      <main className="relative z-10 pt-20 md:pt-24 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-mono font-light tracking-tight text-[#00F0FF] mb-4 md:mb-6">
              CIVILIZATION PROTOCOL
            </h1>
            <p className="font-mono text-sm md:text-base lg:text-lg text-[#E0E0E0]/80 max-w-3xl mx-auto px-4">
              Децентрализованная кибер-физическая платформа для управления водными ресурсами через блокчейн
            </p>
          </motion.div>

          {/* Architecture Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {architectureBlocks.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleBlockClick(block)}
                className="relative h-[300px] md:h-[400px] border border-[#00F0FF]/20 bg-[#050505]/50 
                         hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/5 transition-all cursor-pointer
                         group overflow-hidden"
              >
                {/* Background Visualization */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                  <BlockVisualization type={block.id} color={block.color} />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col p-4 md:p-6">
                  <div style={{ color: block.color }} className="mb-3 md:mb-4">
                    {block.icon}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-mono text-[#E0E0E0] mb-2 md:mb-3 group-hover:text-[#00F0FF] transition-colors">
                    {block.title}
                  </h3>
                  
                  <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/60 flex-1 leading-relaxed">
                    {block.description}
                  </p>

                  <div className="mt-auto pt-3 md:pt-4 border-t border-[#00F0FF]/20">
                    <span className="font-mono text-[10px] md:text-xs text-[#00F0FF] tracking-wider">
                      CLICK FOR DETAILS →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      <DetailModal 
        block={selectedBlock} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

