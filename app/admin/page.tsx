"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Vote, 
  Eye, 
  Clock,
  TrendingUp,
  Settings,
  LogOut,
  FileText,
  Bell
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock data - in production would come from API/database
const mockStats = {
  totalVisits: 12453,
  todayVisits: 247,
  avgSessionTime: '2:34',
  bounceRate: '32%',
  votes: [
    { design: 'Design A', votes: 156, percentage: 35 },
    { design: 'Design B', votes: 112, percentage: 25 },
    { design: 'Design C', votes: 89, percentage: 20 },
    { design: 'Design D', votes: 45, percentage: 10 },
    { design: 'Design E', votes: 28, percentage: 6 },
    { design: 'Design F', votes: 18, percentage: 4 },
  ],
  bookings: [
    { id: 1, name: 'Иван Петров', email: 'ivan@example.com', date: '27 Дек', time: '14:00', status: 'pending' },
    { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', date: '28 Дек', time: '11:00', status: 'confirmed' },
    { id: 3, name: 'Алексей Козлов', email: 'alex@example.com', date: '29 Дек', time: '16:00', status: 'pending' },
  ],
  rewardsStats: {
    totalDiscovered: 234,
    popularReward: 'FIRST_CLICK',
    conversionRate: '12%'
  }
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'votes' | 'bookings' | 'content'>('overview');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if accessed properly (in production would verify session)
    // For now just show the admin panel
    setIsAuthorized(true);
  }, []);

  const handleLogout = () => {
    router.push('/');
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-ink-deep flex items-center justify-center">
        <div className="font-mono text-engrave-fresco">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-deep">
      <div className="fixed inset-0 wireframe-grid pointer-events-none opacity-30" />
      
      {/* Header */}
      <header className="border-b border-stone-anthracite/30 bg-ink-chrome/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-sm text-engrave-fresco tracking-widest">
              ◈ FRACTALIX.LAB
            </Link>
            <span className="font-mono text-[10px] text-stone-slate px-2 py-1 border border-stone-anthracite/30">
              ADMIN
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-stone-slate hover:text-engrave-line transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-engrave-line" />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 border border-stone-anthracite/30 
                       font-mono text-[10px] text-stone-slate hover:text-engrave-line transition-colors"
            >
              <LogOut size={12} />
              ВЫЙТИ
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-stone-anthracite/30">
          {[
            { id: 'overview', icon: <BarChart3 size={14} />, label: 'ОБЗОР' },
            { id: 'votes', icon: <Vote size={14} />, label: 'ГОЛОСОВАНИЕ' },
            { id: 'bookings', icon: <Calendar size={14} />, label: 'ЗАПИСИ' },
            { id: 'content', icon: <FileText size={14} />, label: 'КОНТЕНТ' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 font-mono text-[10px] tracking-widest
                        transition-colors border-b-2 -mb-[1px] ${
                activeTab === tab.id 
                  ? 'text-engrave-fresco border-engrave-line' 
                  : 'text-stone-slate border-transparent hover:text-engrave-dim'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <Eye size={20} />, value: mockStats.totalVisits.toLocaleString(), label: 'Всего посещений' },
                { icon: <Users size={20} />, value: mockStats.todayVisits, label: 'Сегодня' },
                { icon: <Clock size={20} />, value: mockStats.avgSessionTime, label: 'Среднее время' },
                { icon: <TrendingUp size={20} />, value: mockStats.bounceRate, label: 'Bounce Rate' },
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="p-6 border border-stone-anthracite/30 bg-ink-chrome/20"
                >
                  <div className="text-engrave-dim mb-4">{stat.icon}</div>
                  <div className="font-mono text-2xl text-engrave-fresco mb-1">{stat.value}</div>
                  <div className="font-mono text-[9px] text-stone-slate tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Votes & Rewards Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Votes */}
              <div className="p-6 border border-stone-anthracite/30">
                <h3 className="font-mono text-sm text-engrave-fresco mb-4 flex items-center gap-2">
                  <Vote size={16} /> ГОЛОСОВАНИЕ ЗА ДИЗАЙН
                </h3>
                <div className="space-y-3">
                  {mockStats.votes.slice(0, 4).map((vote, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-20 font-mono text-[10px] text-stone-slate">{vote.design}</div>
                      <div className="flex-1 h-2 bg-ink-deep">
                        <div 
                          className="h-full bg-engrave-line/50"
                          style={{ width: `${vote.percentage}%` }}
                        />
                      </div>
                      <div className="w-12 font-mono text-[10px] text-engrave-fresco text-right">
                        {vote.votes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards Stats */}
              <div className="p-6 border border-stone-anthracite/30">
                <h3 className="font-mono text-sm text-engrave-fresco mb-4 flex items-center gap-2">
                  <Settings size={16} /> НАГРАДЫ
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-mono text-2xl text-engrave-fresco">
                      {mockStats.rewardsStats.totalDiscovered}
                    </div>
                    <div className="font-mono text-[9px] text-stone-slate tracking-widest">
                      НАГРАД НАЙДЕНО
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-sm text-engrave-dim">
                      {mockStats.rewardsStats.popularReward}
                    </div>
                    <div className="font-mono text-[9px] text-stone-slate tracking-widest">
                      ПОПУЛЯРНАЯ НАГРАДА
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-sm text-engrave-line">
                      {mockStats.rewardsStats.conversionRate}
                    </div>
                    <div className="font-mono text-[9px] text-stone-slate tracking-widest">
                      КОНВЕРСИЯ В ЗАЯВКИ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Votes Tab */}
        {activeTab === 'votes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6 border border-stone-anthracite/30 mb-6">
              <h3 className="font-mono text-lg text-engrave-fresco mb-6">
                РЕЗУЛЬТАТЫ ГОЛОСОВАНИЯ
              </h3>
              
              <div className="space-y-4">
                {mockStats.votes.map((vote, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-24 font-mono text-sm text-stone-slate">{vote.design}</div>
                    <div className="flex-1 h-6 bg-ink-deep border border-stone-anthracite/30 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${vote.percentage}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="h-full bg-engrave-line/30"
                      />
                      <div className="absolute inset-0 flex items-center justify-between px-2">
                        <span className="font-mono text-[9px] text-engrave-fresco">{vote.percentage}%</span>
                        <span className="font-mono text-[10px] text-stone-slate">{vote.votes} голосов</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-stone-anthracite/30">
                <div className="font-mono text-sm text-stone-slate">
                  Всего голосов: <span className="text-engrave-fresco">{mockStats.votes.reduce((sum, v) => sum + v.votes, 0)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="border border-stone-anthracite/30">
              <div className="p-4 border-b border-stone-anthracite/30 flex items-center justify-between">
                <h3 className="font-mono text-sm text-engrave-fresco">ЗАПИСИ НА КОНСУЛЬТАЦИЮ</h3>
                <span className="font-mono text-[9px] text-stone-slate">
                  {mockStats.bookings.length} записей
                </span>
              </div>
              
              <div className="divide-y divide-stone-anthracite/20">
                {mockStats.bookings.map((booking) => (
                  <div key={booking.id} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-sm text-engrave-fresco">{booking.name}</div>
                      <div className="font-mono text-[10px] text-stone-slate">{booking.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm text-engrave-dim">
                        {booking.date}, {booking.time}
                      </div>
                      <div className={`font-mono text-[9px] ${
                        booking.status === 'confirmed' ? 'text-engrave-line' : 'text-stone-slate'
                      }`}>
                        {booking.status === 'confirmed' ? 'ПОДТВЕРЖДЕНО' : 'ОЖИДАЕТ'}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 border border-engrave-line/30 font-mono text-[9px] text-engrave-line
                                       hover:bg-engrave-line/10 transition-colors">
                        ПОДТВЕРДИТЬ
                      </button>
                      <button className="px-3 py-1.5 border border-stone-anthracite/30 font-mono text-[9px] text-stone-slate
                                       hover:border-stone-slate transition-colors">
                        ОТМЕНИТЬ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FileText size={48} className="mx-auto text-stone-anthracite mb-4" />
            <h3 className="font-mono text-lg text-engrave-fresco mb-2">
              УПРАВЛЕНИЕ КОНТЕНТОМ
            </h3>
            <p className="font-mono text-sm text-stone-slate">
              Раздел в разработке
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

