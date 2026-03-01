#!/usr/bin/env node
import 'dotenv/config';
import { InvestorFinder } from './index.js';

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0] || 'help';

  const githubToken = process.env.GITHUB_TOKEN;
  const productHuntToken = process.env.PRODUCT_HUNT_TOKEN;

  if (!githubToken) {
    console.error('❌ GITHUB_TOKEN не найден в .env.local');
    console.log('Создайте токен: https://github.com/settings/tokens');
    process.exit(1);
  }

  const finder = new InvestorFinder({
    githubToken,
    productHuntToken,
  });

  console.log('🚀 Investor Scout запущен\n');

  switch (cmd) {
    case 'search':
      const type = args[1] || 'blockchain';
      console.log(`🔍 Поиск: ${type}\n`);
      
      if (type === 'blockchain') {
        await finder.findBlockchainDevelopers(50);
      } else if (type === 'founders') {
        await finder.findFounders();
      } else if (type === 'all') {
        await finder.searchAll({ blockchain: true, founders: true });
      }
      break;

    case 'export':
      const format = args[1] || 'csv';
      const filename = `investors-${new Date().toISOString().split('T')[0]}.${format}`;
      await finder.saveToFile(filename, format as 'csv' | 'json');
      console.log(`💾 Экспортировано в: ${filename}`);
      break;

    case 'stats':
      console.log('📊 Статистика:');
      console.log(finder.getStats());
      break;

    case 'help':
    default:
      console.log(`
Использование:
  npm run start -- search [type]     Поиск инвесторов
  npm run start -- export [format]   Экспорт (csv/json)
  npm run start -- stats             Показать статистику

Примеры:
  npm run start -- search blockchain
  npm run start -- search founders
  npm run start -- search all
  npm run start -- export csv
      `);
  }

  console.log('\n✅ Готово!');
}

main().catch(console.error);
