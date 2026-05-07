'use client';

import { Exercise } from '@/types';
import { formatDate, getStartOfMonth, getEndOfMonth } from '@/lib/utils';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MonthChartProps {
  exercises: Exercise[];
}

export default function MonthChart({ exercises }: MonthChartProps) {
  const now = new Date();
  const monthStart = getStartOfMonth(now);
  const monthEnd = getEndOfMonth(now);

  const monthExercises = exercises.filter((ex) => {
    return ex.date >= formatDate(monthStart) && ex.date <= formatDate(monthEnd);
  });

  const daysInMonth = monthEnd.getDate();
  const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
    const dateStr = formatDate(date);
    return monthExercises
      .filter((ex) => ex.date === dateStr)
      .reduce((sum, ex) => sum + ex.duration, 0);
  });

  const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

  const exerciseDays = new Set(monthExercises.map((ex) => ex.date)).size;
  const totalMinutes = monthExercises.reduce((sum, ex) => sum + ex.duration, 0);
  const avgMinutes = exerciseDays > 0 ? (totalMinutes / exerciseDays).toFixed(1) : '0';

  const chartData = {
    labels,
    datasets: [
      {
        label: '운동 시간 (분)',
        data: dailyData,
        borderColor: 'rgba(13, 148, 136, 1)',
        backgroundColor: 'rgba(13, 148, 136, 0.15)',
        fill: true,
        tension: 0.3,
        borderWidth: 2.5,
        pointBackgroundColor: 'rgba(13, 148, 136, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
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
        ticks: { font: { size: 11 }, color: '#6B7280' },
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
      },
      x: {
        ticks: {
          font: { size: 10 },
          color: '#9CA3AF',
          maxRotation: 0,
          maxTicksLimit: 10,
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-base font-bold text-gray-900 mb-4">📊 월간 통계</h3>

      <div className="h-52 mb-5">
        <Line data={chartData} options={chartOptions} />
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
