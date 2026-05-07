'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useExercises } from '@/hooks/useExercises';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import Link from 'next/link';
import WeekChart from '@/components/stats/WeekChart';
import MonthChart from '@/components/stats/MonthChart';
import { formatDate, getStartOfMonth, getEndOfMonth } from '@/lib/utils';

export default function StatsPage() {
  const { user } = useAuth();
  const { exercises, fetchByDateRange, loading } = useExercises();

  useEffect(() => {
    if (!user) return;
    const now = new Date();
    fetchByDateRange(formatDate(getStartOfMonth(now)), formatDate(getEndOfMonth(now)));
  }, [user, fetchByDateRange]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-gray-600 text-xl transition-colors"
              aria-label="뒤로가기"
            >
              ←
            </Link>
            <h1 className="text-xl font-bold text-gray-900">통계</h1>
          </div>
        </div>

        <div className="p-4 max-w-lg mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-400">로딩중...</p>
            </div>
          ) : (
            <>
              <WeekChart exercises={exercises} />
              <MonthChart exercises={exercises} />
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
