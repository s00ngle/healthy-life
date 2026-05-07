'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

interface HeaderProps {
  exerciseDays: number;
  onAddClick: () => void;
}

export default function Header({ exerciseDays, onAddClick }: HeaderProps) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Ignore logout errors
    }
  };

  return (
    <div className="bg-white border-b border-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">운동 기록</h1>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-gray-600 text-lg transition-colors"
          aria-label="로그아웃"
        >
          ✕
        </button>
      </div>

      <div className="bg-teal-50 rounded-2xl p-4">
        <p className="text-base font-semibold text-teal-900 mb-3">
          이번주 {exerciseDays}일 운동했어요 💪
        </p>
        <div className="flex gap-2">
          <button
            onClick={onAddClick}
            className="flex-1 bg-teal-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-teal-700 transition-colors"
          >
            운동 기록하기
          </button>
          <Link
            href="/stats"
            className="flex-1 bg-white text-teal-700 border border-teal-200 py-2.5 rounded-xl font-medium text-sm hover:bg-teal-50 transition-colors text-center"
          >
            통계 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
