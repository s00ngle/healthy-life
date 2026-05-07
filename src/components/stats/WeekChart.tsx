'use client';

import { Exercise } from '@/types';
import { getStartOfWeek, getEndOfWeek, formatDate } from '@/lib/utils';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface WeekChartProps {
  exercises: Exercise[];
}

export default function WeekChart({ exercises }: WeekChartProps) {
  const now = new Date();
  const weekStart = getStartOfWeek(now);
  const weekEnd = getEndOfWeek(now);

  const weekExercises = exercises.filter((ex) => {
    return ex.date >= formatDate(weekStart) && ex.date <= formatDate(weekEnd);
  });

  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
  const minutesByDay = dayLabels.map((_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    const dateStr = formatDate(date);
    return weekExercises
      .filter((ex) => ex.date === dateStr)
      .reduce((sum, ex) => sum + ex.duration, 0);
  });

  const exerciseDays = minutesByDay.filter((m) => m > 0).length;
  const totalMinutes = minutesByDay.reduce((a, b) => a + b, 0);
  const avgMinutes = exerciseDays > 0 ? (totalMinutes / exerciseDays).toFixed(1) : '0';

  const chartData = {
    labels: dayLabels,
    datasets: [
      {
        label: '운동 시간 (분)',
        data: minutesByDay,
        backgroundColor: 'rgba(13, 148, 136, 0.8)',
        borderColor: 'rgba(13, 148, 136, 1)',
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(13, 148, 136, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { size: 12 }, color: '#6B7280' },
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
      },
      x: {
        ticks: { font: { size: 13, weight: 600 as const }, color: '#374151' },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
      <h3 className="text-base font-bold text-gray-900 mb-4">📊 주간 통계</h3>

      <div className="h-48 mb-5">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-teal-50 p-3 rounded-xl text-center">
          <p className="text-xs text-gray-500 mb-1">운동 일수</p>
          <p className="text-xl font-bold text-teal-700">{exerciseDays}일</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-xl text-center">
          <p className="text-xs text-gray-500 mb-1">총 시간</p>
          <p className="text-xl font-bold text-blue-700">{totalMinutes}분</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-xl text-center">
          <p className="text-xs text-gray-500 mb-1">평균 시간</p>
          <p className="text-xl font-bold text-purple-700">{avgMinutes}분</p>
        </div>
      </div>
    </div>
  );
}
