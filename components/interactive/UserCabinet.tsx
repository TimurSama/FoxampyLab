"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Gift, 
  Calendar, 
  MessageCircle, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  Check
} from 'lucide-react';
import { useRewards } from './HiddenRewards';

const MONTHS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const timeSlots = [
  '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

export default function UserCabinet() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'rewards' | 'calendar'>('rewards');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'date' | 'time' | 'confirm' | 'done'>('date');
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', telegram: '' });
  
  const { collectedRewards, totalDiscovered, rewards } = useRewards();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6;
    
    return { daysInMonth, startDay };
  };

  const { daysInMonth, startDay } = getDaysInMonth(currentDate);

  const isDateAvailable = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    return date >= today && dayOfWeek !== 0 && dayOfWeek !== 6;
  };

  const handleDateSelect = (day: number) => {
    if (!isDateAvailable(day)) return;
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setBookingStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingStep('confirm');
  };

  const handleBookingConfirm = () => {
    // Here would be actual booking logic
    setBookingStep('done');
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStep('date');
    setContactInfo({ name: '', email: '', telegram: '' });
  };

  return (
    <>
      {/* Cabinet Button - Bottom Left */}
      <motion.div
        className="fixed bottom-4 left-4 z-[100]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 px-4 py-3 bg-ink-chrome/90 border border-stone-anthracite/50
                   backdrop-blur-xl hover:border-engrave-line/30 transition-colors"
        >
          <User size={16} className="text-engrave-line" />
          <span className="font-mono text-[10px] text-engrave-fresco tracking-widest">
            КАБИНЕТ
          </span>
          {totalDiscovered > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-engrave-fresco text-ink-deep 
                           font-mono text-[8px] flex items-center justify-center">
              {totalDiscovered}
            </span>
          )}
          <ChevronUp 
            size={12} 
            className={`text-stone-slate transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </motion.button>
      </motion.div>

      {/* Cabinet Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-4 z-[100] w-80 max-h-[70vh] overflow-hidden
                     bg-ink-chrome/95 border border-stone-anthracite/50 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-3 border-b border-stone-anthracite/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={14} className="text-engrave-line" />
                <span className="font-mono text-xs text-engrave-fresco">ЛИЧНЫЙ КАБИНЕТ</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-stone-slate hover:text-engrave-line">
                <X size={14} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-stone-anthracite/30">
              <button
                onClick={() => setActiveTab('rewards')}
                className={`flex-1 px-4 py-2 font-mono text-[10px] tracking-widest transition-colors
                          ${activeTab === 'rewards' 
                            ? 'text-engrave-fresco border-b border-engrave-line' 
                            : 'text-stone-slate hover:text-engrave-dim'}`}
              >
                <Gift size={12} className="inline mr-2" />
                НАГРАДЫ
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex-1 px-4 py-2 font-mono text-[10px] tracking-widest transition-colors
                          ${activeTab === 'calendar' 
                            ? 'text-engrave-fresco border-b border-engrave-line' 
                            : 'text-stone-slate hover:text-engrave-dim'}`}
              >
                <Calendar size={12} className="inline mr-2" />
                ЗАПИСАТЬСЯ
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[50vh]">
              {activeTab === 'rewards' ? (
                <div className="p-3 space-y-2">
                  <div className="font-mono text-[9px] text-stone-slate mb-3">
                    Найдено {totalDiscovered} из {rewards.length} наград
                  </div>
                  
                  {collectedRewards.length === 0 ? (
                    <div className="text-center py-8">
                      <Gift size={24} className="mx-auto text-stone-anthracite mb-2" />
                      <p className="font-mono text-[10px] text-stone-slate">
                        Исследуйте сайт, чтобы<br />найти скрытые награды
                      </p>
                    </div>
                  ) : (
                    collectedRewards.map((reward) => (
                      <div 
                        key={reward.id}
                        className="p-3 border border-engrave-line/20 bg-engrave-line/5"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-engrave-line mt-0.5">
                            {reward.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-mono text-xs text-engrave-fresco">
                              {reward.name}
                            </div>
                            <div className="font-mono text-[9px] text-stone-slate mt-1">
                              {reward.benefit}
                            </div>
                            <div className="font-mono text-[8px] text-engrave-dim mt-2">
                              Код: <span className="select-all text-engrave-line">{reward.code}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="p-3">
                  {bookingStep === 'date' && (
                    <>
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-3">
                        <button 
                          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                          className="p-1 text-stone-slate hover:text-engrave-line"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <span className="font-mono text-xs text-engrave-fresco">
                          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </span>
                        <button 
                          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                          className="p-1 text-stone-slate hover:text-engrave-line"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>

                      {/* Days header */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {DAYS.map(day => (
                          <div key={day} className="text-center font-mono text-[8px] text-stone-slate">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: startDay }).map((_, i) => (
                          <div key={`empty-${i}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const available = isDateAvailable(day);
                          return (
                            <button
                              key={day}
                              onClick={() => handleDateSelect(day)}
                              disabled={!available}
                              className={`aspect-square flex items-center justify-center font-mono text-[10px]
                                        border transition-colors ${
                                available 
                                  ? 'border-stone-anthracite/30 text-engrave-fresco hover:border-engrave-line/50 hover:bg-engrave-line/10' 
                                  : 'border-transparent text-stone-anthracite cursor-not-allowed'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {bookingStep === 'time' && selectedDate && (
                    <>
                      <button 
                        onClick={() => setBookingStep('date')}
                        className="flex items-center gap-1 font-mono text-[9px] text-stone-slate mb-3 hover:text-engrave-line"
                      >
                        <ChevronLeft size={12} /> Назад
                      </button>
                      
                      <div className="font-mono text-xs text-engrave-fresco mb-3">
                        {selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]}
                      </div>
                      
                      <div className="font-mono text-[9px] text-stone-slate mb-2">
                        Выберите время:
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className="py-2 border border-stone-anthracite/30 font-mono text-[10px] text-engrave-fresco
                                     hover:border-engrave-line/50 hover:bg-engrave-line/10 transition-colors"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {bookingStep === 'confirm' && (
                    <>
                      <button 
                        onClick={() => setBookingStep('time')}
                        className="flex items-center gap-1 font-mono text-[9px] text-stone-slate mb-3 hover:text-engrave-line"
                      >
                        <ChevronLeft size={12} /> Назад
                      </button>

                      <div className="p-3 border border-stone-anthracite/30 mb-4">
                        <div className="font-mono text-[9px] text-stone-slate mb-1">КОНСУЛЬТАЦИЯ</div>
                        <div className="font-mono text-sm text-engrave-fresco">
                          {selectedDate?.getDate()} {MONTHS[selectedDate?.getMonth() || 0]}, {selectedTime}
                        </div>
                        <div className="font-mono text-[9px] text-stone-slate mt-1">
                          <Clock size={10} className="inline mr-1" /> 30 минут
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <input
                          type="text"
                          placeholder="Ваше имя"
                          value={contactInfo.name}
                          onChange={e => setContactInfo({...contactInfo, name: e.target.value})}
                          className="w-full px-3 py-2 bg-ink-deep border border-stone-anthracite/50 
                                   font-mono text-xs text-engrave-fresco placeholder-stone-anthracite
                                   focus:border-engrave-line/30 focus:outline-none"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={contactInfo.email}
                          onChange={e => setContactInfo({...contactInfo, email: e.target.value})}
                          className="w-full px-3 py-2 bg-ink-deep border border-stone-anthracite/50 
                                   font-mono text-xs text-engrave-fresco placeholder-stone-anthracite
                                   focus:border-engrave-line/30 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Telegram (опционально)"
                          value={contactInfo.telegram}
                          onChange={e => setContactInfo({...contactInfo, telegram: e.target.value})}
                          className="w-full px-3 py-2 bg-ink-deep border border-stone-anthracite/50 
                                   font-mono text-xs text-engrave-fresco placeholder-stone-anthracite
                                   focus:border-engrave-line/30 focus:outline-none"
                        />
                      </div>

                      <button
                        onClick={handleBookingConfirm}
                        disabled={!contactInfo.name || !contactInfo.email}
                        className="w-full py-3 bg-engrave-fresco text-ink-deep font-mono text-[10px] tracking-widest
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ПОДТВЕРДИТЬ ЗАПИСЬ
                      </button>
                    </>
                  )}

                  {bookingStep === 'done' && (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 border border-engrave-line flex items-center justify-center mx-auto mb-4">
                        <Check size={24} className="text-engrave-line" />
                      </div>
                      <h3 className="font-mono text-sm text-engrave-fresco mb-2">
                        ЗАПИСЬ ПОДТВЕРЖДЕНА
                      </h3>
                      <p className="font-mono text-[10px] text-stone-slate mb-4">
                        {selectedDate?.getDate()} {MONTHS[selectedDate?.getMonth() || 0]}, {selectedTime}
                      </p>
                      <p className="font-mono text-[9px] text-stone-slate mb-6">
                        Мы отправим подтверждение на {contactInfo.email}
                      </p>
                      <button
                        onClick={resetBooking}
                        className="font-mono text-[10px] text-engrave-line hover:text-engrave-fresco"
                      >
                        ЗАПИСАТЬСЯ ЕЩЁ
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Contact */}
            <div className="p-3 border-t border-stone-anthracite/30">
              <a 
                href="https://t.me/fractalix_lab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 border border-stone-anthracite/30
                         font-mono text-[10px] text-stone-slate hover:text-engrave-line 
                         hover:border-engrave-line/30 transition-colors"
              >
                <MessageCircle size={12} />
                НАПИСАТЬ В TELEGRAM
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

