'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useExercises } from '@/hooks/useExercises';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import Calendar from '@/components/dashboard/Calendar';
import ExerciseModal from '@/components/dashboard/ExerciseModal';
import Header from '@/components/dashboard/Header';
import { formatDate, getStartOfWeek, getEndOfWeek } from '@/lib/utils';

export default function DashboardPage() {
  const { user } = useAuth();
  const { exercises, fetchByDateRange, add, update, remove } = useExercises();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = user?.uid;
  useEffect(() => {
    if (!userId) return;
    const start = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));
    const end = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0));
    fetchByDateRange(start, end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, currentMonth]);

  const weekExercises = exercises.filter((ex) => {
    const now = new Date();
    return ex.date >= formatDate(getStartOfWeek(now)) && ex.date <= formatDate(getEndOfWeek(now));
  });
  const weekExerciseDays = new Set(weekExercises.map((ex) => ex.date)).size;

  const handlePrevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const handleNextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedDate(formatDate(new Date()));
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const handleAdd = async (type: string, duration: number) => {
    if (!selectedDate) return;
    await add(selectedDate, type, duration);
  };

  const handleEdit = async (id: string, type: string, duration: number) => {
    if (!selectedDate) return;
    await update(id, selectedDate, type, duration);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header exerciseDays={weekExerciseDays} onAddClick={handleAddClick} />
        <div className="p-4 max-w-lg mx-auto">
          <Calendar
            month={currentMonth}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            exercises={exercises}
            onDateClick={handleDateClick}
          />
        </div>

        {selectedDate && (
          <ExerciseModal
            isOpen={isModalOpen}
            date={selectedDate}
            exercises={exercises}
            onClose={handleModalClose}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={remove}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
