'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CalendarPickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  availableDates?: Date[];
  onClose: () => void;
}

export default function CalendarPicker({ selectedDate, onDateSelect, availableDates, onClose }: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Генерируем доступные даты (пример: следующие 60 дней)
  const defaultAvailableDates = useMemo(() => {
    const dates: Date[] = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    for (let i = 0; i < 60; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      // Пропускаем выходные для примера (можно настроить)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  }, []);

  const datesToUse = availableDates || defaultAvailableDates;

  const isDateAvailable = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    return datesToUse.some(d => d.toISOString().split('T')[0] === dateStr);
  };

  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return date.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
  };

  const isToday = (date: Date): boolean => {
    return date.toISOString().split('T')[0] === today.toISOString().split('T')[0];
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];
    
    // Добавляем дни предыдущего месяца для заполнения недели
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Понедельник = 0
    for (let i = startDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push(prevDate);
    }
    
    // Добавляем дни текущего месяца
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    // Добавляем дни следующего месяца для заполнения недели
    const remainingDays = 42 - days.length; // 6 недель * 7 дней
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }
    
    return days;
  };

  const getWeekDays = (date: Date): Date[] => {
    const weekStart = new Date(date);
    const day = weekStart.getDay();
    const diff = weekStart.getDate() - (day === 0 ? 6 : day - 1); // Понедельник = начало недели
    weekStart.setDate(diff);
    
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(weekStart);
      weekDay.setDate(weekStart.getDate() + i);
      week.push(weekDay);
    }
    return week;
  };

  const handleDateClick = (date: Date) => {
    if (isDateAvailable(date)) {
      onDateSelect(date);
      if (viewMode === 'week') {
        setViewMode('month');
      }
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1));
  };

  const prevYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1));
  };

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const weekDayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const weekDays = viewMode === 'week' ? getWeekDays(today) : [];
  const monthDays = viewMode === 'month' ? getDaysInMonth(currentMonth) : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#050505] border border-[#E0E0E0]/20 p-6 max-w-md w-full mx-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}
              className="font-mono text-xs text-[#E0E0E0]/80 hover:text-[#E0E0E0] transition-colors"
            >
              {viewMode === 'week' ? 'Неделя' : 'Месяц'}
            </button>
            {viewMode === 'month' && (
              <div className="flex items-center gap-2">
                <button onClick={prevYear} className="p-1 hover:bg-[#E0E0E0]/10 transition-colors">
                  <ChevronLeft size={16} className="text-[#E0E0E0]/60" />
                </button>
                <span className="font-mono text-sm text-[#E0E0E0] min-w-[120px] text-center">
                  {currentMonth.getFullYear()}
                </span>
                <button onClick={nextYear} className="p-1 hover:bg-[#E0E0E0]/10 transition-colors">
                  <ChevronRight size={16} className="text-[#E0E0E0]/60" />
                </button>
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#E0E0E0]/10 transition-colors">
            <X size={18} className="text-[#E0E0E0]" />
          </button>
        </div>

        {/* Month Navigation */}
        {viewMode === 'month' && (
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-2 hover:bg-[#E0E0E0]/10 transition-colors">
              <ChevronLeft size={20} className="text-[#E0E0E0]" />
            </button>
            <span className="font-mono text-base text-[#E0E0E0]">
              {monthNames[currentMonth.getMonth()]}
            </span>
            <button onClick={nextMonth} className="p-2 hover:bg-[#E0E0E0]/10 transition-colors">
              <ChevronRight size={20} className="text-[#E0E0E0]" />
            </button>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Week Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDayNames.map((day) => (
              <div key={day} className="text-center font-mono text-[10px] text-[#E0E0E0]/60 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {(viewMode === 'week' ? weekDays : monthDays).map((date, idx) => {
              const available = isDateAvailable(date);
              const selected = isDateSelected(date);
              const isTodayDate = isToday(date);
              const isCurrentMonth = viewMode === 'month' && date.getMonth() === currentMonth.getMonth();

              return (
                <button
                  key={`${date.toISOString()}-${idx}`}
                  onClick={() => handleDateClick(date)}
                  disabled={!available}
                  className={`
                    aspect-square flex items-center justify-center font-mono text-xs transition-all
                    ${!available 
                      ? 'text-[#E0E0E0]/20 cursor-not-allowed' 
                      : available && selected
                      ? 'bg-[#E0E0E0] text-[#050505] border border-[#E0E0E0]'
                      : available && isTodayDate
                      ? 'border border-[#E0E0E0]/50 text-[#E0E0E0] hover:bg-[#E0E0E0]/10'
                      : available
                      ? 'text-[#E0E0E0]/60 hover:bg-[#E0E0E0]/10 hover:text-[#E0E0E0] border border-transparent hover:border-[#E0E0E0]/20'
                      : 'text-[#E0E0E0]/20'
                    }
                    ${viewMode === 'month' && !isCurrentMonth ? 'opacity-30' : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Display */}
        {selectedDate && (
          <div className="mt-4 pt-4 border-t border-[#E0E0E0]/10">
            <div className="font-mono text-xs text-[#E0E0E0]/60">
              Выбранная дата: {selectedDate.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}


