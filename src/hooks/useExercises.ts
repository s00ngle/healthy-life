'use client';

import { useCallback, useState } from 'react';
import { useAuth } from './useAuth';
import {
  addExercise,
  updateExercise,
  deleteExercise,
  getExercisesByDateRange,
} from '@/lib/exercises';
import { Exercise } from '@/types';

export function useExercises() {
  const { user } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchByDateRange = useCallback(
    async (startDate: string, endDate: string) => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await getExercisesByDateRange(user.uid, startDate, endDate);
        setExercises(data);
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const add = useCallback(
    async (date: string, type: string, duration: number) => {
      if (!user) return;
      const newEx = await addExercise(user.uid, date, type, duration);
      setExercises((prev) => [...prev, newEx]);
    },
    [user]
  );

  const update = useCallback(
    async (id: string, date: string, type: string, duration: number) => {
      await updateExercise(id, date, type, duration);
      setExercises((prev) =>
        prev.map((ex) => (ex.id === id ? { ...ex, date, type, duration } : ex))
      );
    },
    []
  );

  const remove = useCallback(async (id: string) => {
    await deleteExercise(id);
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  }, []);

  return { exercises, loading, error, fetchByDateRange, add, update, remove };
}
