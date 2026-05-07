import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Exercise } from '@/types';

const EXERCISES_COLLECTION = 'exercises';

export async function addExercise(
  userId: string,
  date: string,
  type: string,
  duration: number
): Promise<Exercise> {
  const now = Timestamp.now().toMillis();
  const docRef = await addDoc(collection(db, EXERCISES_COLLECTION), {
    userId,
    date,
    type,
    duration,
    createdAt: now,
    updatedAt: now,
  });

  return { id: docRef.id, date, type, duration, createdAt: now, updatedAt: now };
}

export async function updateExercise(
  exerciseId: string,
  date: string,
  type: string,
  duration: number
): Promise<void> {
  const docRef = doc(db, EXERCISES_COLLECTION, exerciseId);
  const now = Timestamp.now().toMillis();
  await updateDoc(docRef, { date, type, duration, updatedAt: now });
}

export async function deleteExercise(exerciseId: string): Promise<void> {
  await deleteDoc(doc(db, EXERCISES_COLLECTION, exerciseId));
}

export async function getExercisesByDateRange(
  userId: string,
  startDate: string,
  endDate: string
): Promise<Exercise[]> {
  const q = query(
    collection(db, EXERCISES_COLLECTION),
    where('userId', '==', userId),
    where('date', '>=', startDate),
    where('date', '<=', endDate)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      date: data.date,
      type: data.type,
      duration: data.duration,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  });
}

export function calculateWeekStats(exercises: Exercise[]) {
  const exerciseDays = new Set(exercises.map((ex) => ex.date)).size;
  const totalMinutes = exercises.reduce((sum, ex) => sum + ex.duration, 0);
  return {
    exerciseDays,
    totalMinutes,
    averageMinutes: exerciseDays > 0 ? Math.round((totalMinutes / exerciseDays) * 10) / 10 : 0,
  };
}

export function calculateMonthStats(exercises: Exercise[]) {
  return calculateWeekStats(exercises);
}
