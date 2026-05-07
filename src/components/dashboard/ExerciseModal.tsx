'use client';

import { useState } from 'react';
import { Exercise } from '@/types';
import { EXERCISE_TYPE_OPTIONS } from '@/lib/constants';

interface ExerciseModalProps {
  isOpen: boolean;
  date: string;
  exercises: Exercise[];
  onClose: () => void;
  onAdd: (type: string, duration: number) => Promise<void>;
  onEdit: (id: string, type: string, duration: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function ExerciseModal({
  isOpen,
  date,
  exercises,
  onClose,
  onAdd,
  onEdit,
  onDelete,
}: ExerciseModalProps) {
  const [newType, setNewType] = useState('요가');
  const [newDuration, setNewDuration] = useState('30');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editType, setEditType] = useState('요가');
  const [editDuration, setEditDuration] = useState('30');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dailyExercises = exercises.filter((ex) => ex.date === date);
  const totalMinutes = dailyExercises.reduce((sum, ex) => sum + ex.duration, 0);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const duration = parseInt(newDuration, 10);
    if (!duration || duration < 1) return;

    setLoading(true);
    setError(null);
    try {
      await onAdd(newType, duration);
      setNewType('요가');
      setNewDuration('30');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string) => {
    const duration = parseInt(editDuration, 10);
    if (!duration || duration < 1) return;

    setLoading(true);
    setError(null);
    try {
      await onEdit(id, editType, duration);
      setEditingId(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return;

    setLoading(true);
    setError(null);
    try {
      await onDelete(id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEditStart = (exercise: Exercise) => {
    setEditingId(exercise.id);
    setEditType(exercise.type);
    setEditDuration(exercise.duration.toString());
  };

  if (!isOpen) return null;

  const displayDate = new Date(date + 'T00:00:00').toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{displayDate}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          {dailyExercises.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                오늘의 운동 — 총 {totalMinutes}분
              </p>
              <div className="space-y-2">
                {dailyExercises.map((exercise) => (
                  <div key={exercise.id}>
                    {editingId === exercise.id ? (
                      <div className="flex gap-2 items-center">
                        <select
                          value={editType}
                          onChange={(e) => setEditType(e.target.value)}
                          className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          {EXERCISE_TYPE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          value={editDuration}
                          onChange={(e) => setEditDuration(e.target.value)}
                          min="1"
                          className="w-16 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                          onClick={() => handleEdit(exercise.id)}
                          disabled={loading}
                          className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 disabled:opacity-50 transition-colors"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-sm font-medium text-gray-800">
                          {exercise.type}{' '}
                          <span className="text-gray-500 font-normal">{exercise.duration}분</span>
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEditStart(exercise)}
                            className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs hover:bg-blue-100 transition-colors"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDelete(exercise.id)}
                            disabled={loading}
                            className="px-2.5 py-1 bg-red-50 text-red-500 rounded-lg text-xs hover:bg-red-100 transition-colors"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">새로운 운동 추가</p>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">운동 종류</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {EXERCISE_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  운동 시간 (분)
                </label>
                <input
                  type="number"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-teal-700 disabled:opacity-50 transition-colors"
              >
                {loading ? '추가중...' : '추가하기'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
