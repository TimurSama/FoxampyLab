/**
 * Scheduler - Автоматический запуск задач
 * Управление всеми автоматизациями
 */

import { CronJob } from 'cron';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const execAsync = promisify(exec);

// ===== КОНФИГУРАЦИЯ ЗАДАЧ =====

interface ScheduledTask {
  name: string;
  cron: string;
  command: string;
  enabled: boolean;
  description: string;
}

const TASKS: ScheduledTask[] = [
  {
    name: 'hh-parser',
    cron: '0 */2 * * *', // Каждые 2 часа
    command: 'npx ts-node automations/parsers/hh-rabota-parser.ts',
    enabled: true,
    description: 'Парсинг вакансий с hh.ru и rabota.by',
  },
  {
    name: 'telegram-hunter',
    cron: '*/30 * * * *', // Каждые 30 минут
    command: 'npx ts-node automations/bots/telegram-job-hunter.ts',
    enabled: true,
    description: 'Мониторинг Telegram-чатов',
  },
  {
    name: 'linkedin-scout',
    cron: '0 9 * * *', // Каждый день в 9:00
    command: 'npx ts-node automations/parsers/linkedin-scout.ts',
    enabled: false, // Требует настройки
    description: 'Поиск контактов в LinkedIn',
  },
  {
    name: 'email-followup',
    cron: '0 10 * * *', // Каждый день в 10:00
    command: 'npx ts-node automations/outreach/email-sender.ts check-replies',
    enabled: true,
    description: 'Проверка ответов на email',
  },
  {
    name: 'stats-report',
    cron: '0 18 * * *', // Каждый день в 18:00
    command: 'npx ts-node automations/scheduler/daily-report.ts',
    enabled: true,
    description: 'Ежедневный отчет о лидах',
  },
  {
    name: 'database-cleanup',
    cron: '0 3 * * 0', // Каждое воскресенье в 3:00
    command: 'npx ts-node automations/scheduler/cleanup.ts',
    enabled: true,
    description: 'Очистка старых записей',
  },
];

// ===== ЗАПУСК ЗАДАЧ =====

class TaskScheduler {
  private jobs: Map<string, CronJob> = new Map();
  
  async startTask(task: ScheduledTask) {
    if (!task.enabled) {
      console.log(`⏸️ ${task.name} is disabled`);
      return;
    }
    
    console.log(`✅ Starting: ${task.name} (${task.cron})`);
    
    const job = new CronJob(
      task.cron,
      async () => {
        console.log(`\n[${new Date().toISOString()}] Running: ${task.name}`);
        
        try {
          const { stdout, stderr } = await execAsync(task.command);
          
          if (stdout) console.log(stdout);
          if (stderr) console.error(stderr);
          
          // Логирование успеха
          await this.logRun(task.name, 'success');
          
        } catch (error) {
          console.error(`❌ ${task.name} failed:`, error);
          await this.logRun(task.name, 'error', String(error));
        }
      },
      null, // onComplete
      true, // start immediately
      'Europe/Minsk' // timezone
    );
    
    this.jobs.set(task.name, job);
  }
  
  stopTask(name: string) {
    const job = this.jobs.get(name);
    if (job) {
      job.stop();
      this.jobs.delete(name);
      console.log(`⏹️ Stopped: ${name}`);
    }
  }
  
  stopAll() {
    this.jobs.forEach((job, name) => {
      job.stop();
      console.log(`⏹️ Stopped: ${name}`);
    });
    this.jobs.clear();
  }
  
  private async logRun(taskName: string, status: 'success' | 'error', error?: string) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
      );
      
      await supabase.from('scheduler_logs').insert([{
        task_name: taskName,
        status,
        error,
        run_at: new Date().toISOString(),
      }]);
    } catch (e) {
      console.error('Logging error:', e);
    }
  }
  
  getStatus() {
    return {
      running: Array.from(this.jobs.keys()),
      total: TASKS.length,
      enabled: TASKS.filter(t => t.enabled).length,
    };
  }
}

// ===== CLI =====

async function main() {
  const scheduler = new TaskScheduler();
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'start':
      console.log('🚀 Starting scheduler...\n');
      
      // Запускаем все включенные задачи
      for (const task of TASKS) {
        await scheduler.startTask(task);
      }
      
      console.log('\n📊 Status:', scheduler.getStatus());
      console.log('Press Ctrl+C to stop\n');
      
      // Graceful shutdown
      process.on('SIGINT', () => {
        console.log('\n\n👋 Shutting down...');
        scheduler.stopAll();
        process.exit(0);
      });
      
      // Держим процесс живым
      setInterval(() => {}, 1000);
      break;
      
    case 'run':
      // Однократный запуск задачи
      const taskName = args[1];
      const task = TASKS.find(t => t.name === taskName);
      
      if (!task) {
        console.log(`Unknown task: ${taskName}`);
        console.log(`Available: ${TASKS.map(t => t.name).join(', ')}`);
        return;
      }
      
      console.log(`Running: ${task.name}`);
      try {
        const { stdout, stderr } = await execAsync(task.command);
        console.log(stdout);
        if (stderr) console.error(stderr);
      } catch (error) {
        console.error('Error:', error);
      }
      break;
      
    case 'list':
      console.log('Scheduled Tasks:');
      console.log('─'.repeat(80));
      TASKS.forEach(task => {
        const status = task.enabled ? '✅' : '⏸️';
        console.log(`${status} ${task.name}`);
        console.log(`   Cron: ${task.cron}`);
        console.log(`   Desc: ${task.description}`);
        console.log('');
      });
      break;
      
    default:
      console.log(`
Usage:
  npm run scheduler -- start          # Start all scheduled tasks
  npm run scheduler -- run <task>     # Run single task immediately
  npm run scheduler -- list           # List all tasks

Available tasks: ${TASKS.map(t => t.name).join(', ')}
      `);
  }
}

main().catch(console.error);
