'use client';

import { Exercise } from '@/types';
import { getWeeksInMonth, formatDate } from '@/lib/utils';

interface CalendarProps {
  month: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  exercises: Exercise[];
  onDateClick: (date: string) => void;
}

export default function Calendar({
  month,
  onPrevMonth,
  onNextMonth,
  exercises,
  onDateClick,
}: CalendarProps) {
  const weeks = getWeeksInMonth(month);
  const monthYear = month.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });

  const exercisesByDate: Record<string, number> = {};
  exercises.forEach((ex) => {
    exercisesByDate[ex.date] = (exercisesByDate[ex.date] ?? 0) + ex.duration;
  });

  const getColorClass = (minutes: number) => {
    if (minutes === 0) return 'bg-gray-100 hover:bg-gray-200';
    if (minutes < 30) return 'bg-teal-200 hover:bg-teal-300';
    if (minutes < 60) return 'bg-teal-400 hover:bg-teal-500';
    if (minutes < 120) return 'bg-teal-600 hover:bg-teal-700';
    return 'bg-teal-800 hover:bg-teal-900';
  };

  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">{monthYear}</h2>
        <div className="flex gap-1">
          <button
            onClick={onPrevMonth}
            className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-sm transition-colors"
          >
            ◀
          </button>
          <button
            onClick={onNextMonth}
            className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-sm transition-colors"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLabels.map((day) => (
          <div
            key={day}
            className="h-6 flex items-center justify-center text-xs font-medium text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="grid grid-cols-7 gap-1">
            {week.map((date) => {
              const dateStr = formatDate(date);
              const isCurrentMonth = date.getMonth() === month.getMonth();
              const minutes = exercisesByDate[dateStr] ?? 0;

              return (
                <button
                  key={dateStr}
                  onClick={() => onDateClick(dateStr)}
                  className={`
                    h-10 rounded-lg text-xs font-medium transition-colors
                    ${isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
                    ${getColorClass(minutes)}
                  `}
                  title={minutes > 0 ? `${minutes}분` : undefined}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
        <span>적음</span>
        <div className="flex gap-1">
          {['bg-gray-100', 'bg-teal-200', 'bg-teal-400', 'bg-teal-600', 'bg-teal-800'].map(
            (cls) => (
              <div key={cls} className={`w-4 h-4 rounded ${cls}`} />
            )
          )}
        </div>
        <span>많음</span>
      </div>
    </div>
  );
}
