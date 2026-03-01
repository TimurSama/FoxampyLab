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
  const [viewMode, setViewMode] = useState<'week' | 'month'>('month');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const defaultAvailableDates = useMemo(() => {
    const dates: Date[] = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    for (let i = 0; i < 60; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
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

    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    for (let i = startDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push(prevDate);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }

    return days;
  };

  const getWeekDays = (date: Date): Date[] => {
    const weekStart = new Date(date);
    const day = weekStart.getDay();
    const diff = weekStart.getDate() - (day === 0 ? 6 : day - 1);
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

  const weekDays = getWeekDays(today);
  const monthDays = getDaysInMonth(currentMonth);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/10 px-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-glass-matte p-8 max-w-md w-full shadow-2xl rounded-sm"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex bg-white/5 p-1 rounded-sm border border-white/5">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all ${viewMode === 'week' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all ${viewMode === 'month' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              Month
            </button>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 transition-colors rounded-full">
            <X size={18} className="text-white/40 hover:text-white" />
          </button>
        </div>

        {viewMode === 'month' && (
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center justify-between bg-white/5 p-2 border border-white/10">
              <button
                onClick={prevYear}
                className="p-1 hover:bg-white/10 transition-colors text-white/20 hover:text-white"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white">
                {currentMonth.getFullYear()}
              </span>
              <button
                onClick={nextYear}
                className="p-1 hover:bg-white/10 transition-all text-white/20 hover:text-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between px-2">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-white/10 transition-all text-white"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-mono text-lg text-white uppercase tracking-tight">
                {monthNames[currentMonth.getMonth()]}
              </span>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-white/10 transition-all text-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-1">
            {weekDayNames.map((day) => (
              <div key={day} className="text-center font-mono text-[9px] uppercase tracking-widest text-white/20 py-2">
                {day}
              </div>
            ))}
          </div>

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
                    aspect-square flex flex-col items-center justify-center font-mono text-xs transition-all relative
                    ${!available
                      ? 'text-white/5 cursor-not-allowed'
                      : selected
                        ? 'bg-white text-black'
                        : isTodayDate
                          ? 'text-white border border-white/30'
                          : 'text-white/40 hover:bg-white/5 hover:text-white'
                    }
                    ${viewMode === 'month' && !isCurrentMonth ? 'opacity-20' : ''}
                  `}
                >
                  {date.getDate()}
                  {isTodayDate && !selected && <div className="absolute bottom-1 w-1 h-1 bg-white rounded-full" />}
                </button>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">Selected Date</span>
              <span className="font-mono text-[10px] text-white">
                {selectedDate.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
