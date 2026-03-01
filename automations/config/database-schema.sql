-- =====================================================
-- DATABASE SCHEMA FOR FOXAMPY LAB AUTOMATIONS
-- Отдельные таблицы для каждого направления
-- =====================================================

-- ============================================
-- 1. WEB3 / BLOCKCHAIN DIRECTION
-- ============================================

CREATE TABLE web3_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL, -- telegram, linkedin, twitter, etc.
  source_url TEXT,
  
  -- Информация о проекте
  project_name TEXT,
  project_type TEXT, -- defi, nft, dao, gamefi, etc.
  description TEXT,
  stage TEXT, -- idea, mvp, testnet, mainnet
  
  -- Контактная информация
  contact_name TEXT,
  contact_position TEXT,
  telegram TEXT,
  email TEXT,
  linkedin TEXT,
  twitter TEXT,
  
  -- Финансирование
  funding_status TEXT, -- seeking, seed, series_a, etc.
  funding_amount TEXT,
  
  -- Оценка
  score INTEGER DEFAULT 0, -- 0-100
  matched_keywords TEXT[],
  ai_analysis JSONB,
  
  -- Статус
  status TEXT DEFAULT 'new', -- new, contacted, replied, meeting, proposal, closed
  priority TEXT DEFAULT 'medium', -- low, medium, high
  
  -- Даты
  discovered_at TIMESTAMP DEFAULT NOW(),
  contacted_at TIMESTAMP,
  replied_at TIMESTAMP,
  last_activity_at TIMESTAMP DEFAULT NOW(),
  
  -- Назначение
  assigned_to TEXT DEFAULT 'timur',
  notes TEXT
);

CREATE INDEX idx_web3_leads_status ON web3_leads(status);
CREATE INDEX idx_web3_leads_score ON web3_leads(score DESC);
CREATE INDEX idx_web3_leads_project_type ON web3_leads(project_type);

-- ============================================
-- 2. WEB DEVELOPMENT DIRECTION
-- ============================================

CREATE TABLE webdev_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  source_url TEXT,
  
  -- Компания/проект
  company_name TEXT,
  industry TEXT, -- ecommerce, saas, healthcare, etc.
  company_size TEXT, -- startup, smb, enterprise
  
  -- Проект
  project_type TEXT, -- mvp, redesign, ecommerce, app
  description TEXT,
  budget_range TEXT, -- 5-10k, 10-25k, 25-50k, 50k+
  timeline TEXT, -- asap, 1month, 3months, flexible
  
  -- Контакты
  contact_name TEXT,
  contact_position TEXT,
  telegram TEXT,
  email TEXT,
  phone TEXT,
  
  -- Технологии
  tech_stack TEXT[], -- react, nodejs, python, etc.
  platforms TEXT[], -- web, ios, android, desktop
  
  -- Оценка
  score INTEGER DEFAULT 0,
  matched_keywords TEXT[],
  ai_analysis JSONB,
  
  -- Статус
  status TEXT DEFAULT 'new',
  pipeline_stage TEXT DEFAULT 'lead', -- lead, qualified, proposal, negotiation, won, lost
  
  -- Даты
  discovered_at TIMESTAMP DEFAULT NOW(),
  contacted_at TIMESTAMP,
  proposal_sent_at TIMESTAMP,
  
  -- Финансы
  proposal_amount DECIMAL,
  deal_value DECIMAL,
  
  notes TEXT
);

CREATE INDEX idx_webdev_leads_status ON webdev_leads(status);
CREATE INDEX idx_webdev_leads_industry ON webdev_leads(industry);
CREATE INDEX idx_webdev_leads_project_type ON webdev_leads(project_type);

-- ============================================
-- 3. MARKETING DIRECTION
-- ============================================

CREATE TABLE marketing_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  source_url TEXT,
  
  -- Компания
  company_name TEXT,
  industry TEXT,
  current_marketing TEXT, -- none, basic, advanced
  
  -- Потребности
  service_needed TEXT[], -- strategy, branding, ads, content, launch
  pain_points TEXT[],
  goals TEXT[], -- awareness, leads, sales, retention
  
  -- Бюджет
  monthly_budget TEXT, -- 1-3k, 3-5k, 5-10k, 10k+
  project_budget TEXT,
  
  -- Контакты
  contact_name TEXT,
  contact_position TEXT, -- founder, cmo, marketing_manager
  telegram TEXT,
  email TEXT,
  
  -- Оценка
  score INTEGER DEFAULT 0,
  budget_fit INTEGER, -- 1-10
  authority INTEGER, -- 1-10 (decision maker?)
  need INTEGER, -- 1-10
  timeline INTEGER, -- 1-10
  
  -- Статус
  status TEXT DEFAULT 'new',
  
  discovered_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);

CREATE INDEX idx_marketing_leads_status ON marketing_leads(status);
CREATE INDEX idx_marketing_leads_service ON marketing_leads USING GIN(service_needed);

-- ============================================
-- 4. DESIGN DIRECTION
-- ============================================

CREATE TABLE design_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  source_url TEXT,
  
  -- Проект
  project_name TEXT,
  design_type TEXT[], -- ux_ui, branding, motion, illustration
  project_scope TEXT, -- single_page, mvp, full_product, redesign
  
  -- Компания
  company_name TEXT,
  industry TEXT,
  
  -- Контакты
  contact_name TEXT,
  contact_position TEXT,
  telegram TEXT,
  email TEXT,
  portfolio_url TEXT,
  
  -- Требования
  deadline TEXT,
  budget TEXT,
  style_preferences TEXT[],
  
  -- Оценка
  score INTEGER DEFAULT 0,
  
  status TEXT DEFAULT 'new',
  discovered_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);

-- ============================================
-- 5. JOB SEARCH (Вакансии)
-- ============================================

CREATE TABLE job_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  direction TEXT NOT NULL, -- web3, webdev, marketing, design, product
  
  -- Вакансия
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  company_size TEXT,
  location TEXT,
  remote BOOLEAN DEFAULT false,
  
  -- Описание
  description TEXT,
  requirements TEXT[],
  responsibilities TEXT[],
  
  -- Финансы
  salary_from INTEGER,
  salary_to INTEGER,
  currency TEXT DEFAULT 'USD',
  
  -- Источник
  source TEXT NOT NULL, -- hh, linkedin, telegram, angel
  source_url TEXT,
  source_id TEXT,
  
  -- Контакты
  contact_email TEXT,
  contact_telegram TEXT,
  recruiter_name TEXT,
  
  -- Оценка
  score INTEGER DEFAULT 0,
  matched_skills TEXT[],
  red_flags TEXT[],
  ai_recommendation TEXT, -- apply, ignore, analyze
  
  -- Действия
  cover_letter TEXT,
  status TEXT DEFAULT 'new', -- new, applied, interview, offer, rejected, accepted
  
  -- Даты
  published_at TIMESTAMP,
  applied_at TIMESTAMP,
  discovered_at TIMESTAMP DEFAULT NOW(),
  
  notes TEXT
);

CREATE INDEX idx_jobs_status ON job_opportunities(status);
CREATE INDEX idx_jobs_direction ON job_opportunities(direction);
CREATE INDEX idx_jobs_score ON job_opportunities(score DESC);

-- ============================================
-- 6. OUTREACH (Рассылки)
-- ============================================

CREATE TABLE outreach_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  direction TEXT NOT NULL,
  channel TEXT NOT NULL, -- email, telegram, linkedin
  
  -- Контент
  template_used TEXT,
  subject TEXT,
  message_text TEXT,
  
  -- Статистика
  total_sent INTEGER DEFAULT 0,
  delivered INTEGER DEFAULT 0,
  opened INTEGER DEFAULT 0,
  clicked INTEGER DEFAULT 0,
  replied INTEGER DEFAULT 0,
  converted INTEGER DEFAULT 0,
  
  -- Статус
  status TEXT DEFAULT 'active', -- active, paused, completed
  
  created_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE TABLE outreach_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES outreach_campaigns(id),
  
  -- Получатель
  recipient_name TEXT,
  recipient_email TEXT,
  recipient_telegram TEXT,
  recipient_linkedin TEXT,
  
  -- Сообщение
  message_text TEXT,
  personalized_vars JSONB,
  
  -- Отслеживание
  sent_at TIMESTAMP,
  delivered_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  replied_at TIMESTAMP,
  
  -- Статус
  status TEXT DEFAULT 'pending', -- pending, sent, delivered, opened, replied, bounced
  
  -- Ответ
  reply_text TEXT,
  reply_sentiment TEXT -- positive, neutral, negative
);

CREATE INDEX idx_outreach_campaign ON outreach_messages(campaign_id);
CREATE INDEX idx_outreach_status ON outreach_messages(status);

-- ============================================
-- 7. ANALYTICS (Поведение на сайте)
-- ============================================

CREATE TABLE website_visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE,
  
  -- Источник
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  
  -- Устройство
  user_agent TEXT,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  
  -- Поведение
  pages_viewed INTEGER DEFAULT 0,
  time_on_site INTEGER DEFAULT 0, -- в секундах
  scroll_depth INTEGER DEFAULT 0, -- процент
  
  -- AI-источник
  ai_referrer TEXT, -- chatgpt, gemini, perplexity, etc.
  
  -- Конверсия
  converted BOOLEAN DEFAULT false,
  conversion_type TEXT, -- form_submit, telegram_click, email_click
  
  first_visit_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT REFERENCES website_visitors(session_id),
  page_path TEXT,
  time_on_page INTEGER,
  scroll_depth INTEGER,
  clicked_elements TEXT[],
  viewed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_visitors_session ON website_visitors(session_id);
CREATE INDEX idx_visitors_ai ON website_visitors(ai_referrer);
CREATE INDEX idx_page_views_session ON page_views(session_id);

-- ============================================
-- 8. TALENTS (Поиск исполнителей)
-- ============================================

CREATE TABLE design_talents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  platform TEXT, -- behance, dribbble
  profile_url TEXT UNIQUE,
  
  -- Портфолио
  specialty TEXT[], -- ux_ui, branding, motion
  style_tags TEXT[],
  
  -- Контакты
  email TEXT,
  telegram TEXT,
  
  -- Оценка
  portfolio_score INTEGER,
  relevance_score INTEGER,
  availability TEXT, -- available, busy, unknown
  
  status TEXT DEFAULT 'new', -- new, contacted, replied, hired, declined
  discovered_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE developer_talents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  platform TEXT, -- github, gitlab
  profile_url TEXT UNIQUE,
  
  -- Навыки
  languages TEXT[],
  frameworks TEXT[],
  specialties TEXT[], -- frontend, backend, blockchain, mobile
  
  -- Активность
  followers INTEGER,
  repos_count INTEGER,
  contribution_streak INTEGER,
  
  -- Оценка
  skill_score INTEGER,
  activity_score INTEGER,
  
  status TEXT DEFAULT 'new',
  discovered_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 9. TASKS / AUTOMATION LOGS
-- ============================================

CREATE TABLE automation_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_name TEXT NOT NULL,
  task_type TEXT NOT NULL, -- parser, outreach, notification
  
  -- Статус
  status TEXT DEFAULT 'pending', -- pending, running, completed, failed
  error_message TEXT,
  
  -- Статистика
  items_processed INTEGER DEFAULT 0,
  items_created INTEGER DEFAULT 0,
  
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tasks_status ON automation_tasks(status);
CREATE INDEX idx_tasks_type ON automation_tasks(task_type);

-- ============================================
-- 10. SETTINGS & CONFIG
-- ============================================

CREATE TABLE automation_settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Начальные настройки
INSERT INTO automation_settings (key, value) VALUES
('telegram_limits', '{"messages_per_hour": 5, "messages_per_day": 30}'),
('linkedin_limits', '{"connections_per_day": 20, "messages_per_day": 15}'),
('email_limits', '{"emails_per_day": 50, "warmup_mode": true}'),
('hh_limits', '{"applications_per_day": 20}'),
('ai_thresholds', '{"min_score": 70, "high_score": 85}');

-- ============================================
-- VIEWS (для удобства аналитики)
-- ============================================

-- Активные лиды по направлениям
CREATE VIEW active_leads_by_direction AS
SELECT 
  direction,
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as new_count,
  COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted_count,
  COUNT(CASE WHEN status IN ('meeting', 'proposal') THEN 1 END) as pipeline_count,
  AVG(score) as avg_score
FROM (
  SELECT 'web3' as direction, status, score FROM web3_leads
  UNION ALL
  SELECT 'webdev' as direction, status, score FROM webdev_leads
  UNION ALL
  SELECT 'marketing' as direction, status, score FROM marketing_leads
  UNION ALL
  SELECT 'design' as direction, status, score FROM design_leads
) leads
GROUP BY direction;

-- Конверсия вакансий
CREATE VIEW job_conversion_stats AS
SELECT 
  direction,
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'applied' THEN 1 END) as applied,
  COUNT(CASE WHEN status = 'interview' THEN 1 END) as interviews,
  COUNT(CASE WHEN status = 'offer' THEN 1 END) as offers,
  ROUND(COUNT(CASE WHEN status = 'offer' THEN 1 END)::numeric / NULLIF(COUNT(*), 0) * 100, 2) as conversion_rate
FROM job_opportunities
GROUP BY direction;
