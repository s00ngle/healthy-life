# Exercise Tracker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-stack exercise tracking web app with user authentication, calendar heatmap visualization, and monthly statistics.

**Architecture:** Next.js app with Firebase backend (Firestore + Auth). Frontend-only deployment to Vercel with Firebase handling all persistence and authentication. Data model: each user has exercises stored in Firestore, keyed by date.

**Tech Stack:** Next.js 14+, React, TailwindCSS, Firebase (Firestore + Authentication), Chart.js (charts), Vercel (hosting)

---

## File Structure

```
healthy-life/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout with providers
│   │   ├── page.tsx                    # Auth page (login/signup)
│   │   ├── dashboard/
│   │   │   └── page.tsx                # Main page (calendar + header)
│   │   ├── stats/
│   │   │   └── page.tsx                # Stats page (charts)
│   │   └── api/
│   │       └── (placeholder for future use, not needed for MVP)
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthForm.tsx            # Login/signup form
│   │   ├── dashboard/
│   │   │   ├── Header.tsx              # Top section with week summary + buttons
│   │   │   ├── Calendar.tsx            # Heatmap calendar with nav
│   │   │   └── ExerciseModal.tsx       # Add/edit exercise modal
│   │   ├── stats/
│   │   │   ├── WeekChart.tsx           # Weekly bar chart
│   │   │   └── MonthChart.tsx          # Monthly line chart
│   │   └── common/
│   │       └── ProtectedRoute.tsx      # Auth guard wrapper
│   ├── lib/
│   │   ├── firebase.ts                 # Firebase initialization
│   │   ├── auth.ts                     # Auth context & hooks
│   │   ├── exercises.ts                # Exercise CRUD operations
│   │   ├── utils.ts                    # Date/stats utilities
│   │   └── constants.ts                # Exercise types
│   ├── hooks/
│   │   ├── useAuth.ts                  # Auth context hook
│   │   ├── useExercises.ts             # Exercise CRUD hook
│   │   └── useWeekStats.ts             # Calculate week stats
│   ├── types/
│   │   └── index.ts                    # TypeScript types
│   └── globals.css                     # TailwindCSS styles
├── .env.local                          # Firebase config
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.js`
- Create: `.env.local`, `.gitignore`

- [ ] **Step 1: Create Next.js app with TypeScript**

```bash
cd C:\work\healthy-life
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-git
```

Select options:
- Use TypeScript: Yes
- Use ESLint: Yes
- Use Tailwind: Yes
- Use App Router: Yes
- Import alias: @/*

- [ ] **Step 2: Install Firebase SDK**

```bash
npm install firebase
```

- [ ] **Step 3: Install Chart.js and react-chartjs-2 for charts**

```bash
npm install chart.js react-chartjs-2
```

- [ ] **Step 4: Create `.env.local` template**

Create `C:\work\healthy-life\.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Note: You'll fill these in after creating a Firebase project.

- [ ] **Step 5: Update `.gitignore`**

Edit `C:\work\healthy-life\.gitignore` to add:

```
.env.local
.env.local.backup
.next/
```

- [ ] **Step 6: Verify setup**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000`

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.js tailwind.config.js .env.local .gitignore
git commit -m "feat: initialize next.js project with firebase and recharts"
```

---

## Task 2: Set Up Firebase Configuration

**Files:**
- Create: `src/lib/firebase.ts`
- Create: `src/lib/constants.ts`
- Create: `src/types/index.ts`

- [ ] **Step 1: Create TypeScript types**

Create `C:\work\healthy-life\src\types\index.ts`:

```typescript
export interface Exercise {
  id: string;
  date: string; // YYYY-MM-DD
  type: string; // One of EXERCISE_TYPES
  duration: number; // minutes
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
}

export interface User {
  uid: string;
  email: string;
  createdAt: number;
}

export interface WeekStats {
  totalMinutes: number;
  exerciseDays: number;
  averageMinutes: number;
}

export interface MonthStats {
  totalMinutes: number;
  exerciseDays: number;
  averageMinutes: number;
}
```

- [ ] **Step 2: Create exercise type constants**

Create `C:\work\healthy-life\src\lib\constants.ts`:

```typescript
export const EXERCISE_TYPES = [
  '요가',
  '헬스',
  '조깅',
  '수영',
  '자전거',
  '산책',
  '줄넘기',
  '스트레칭',
  '등산',
  '런닝머신',
  '계단',
  '댄스',
  '스포츠 (기타)',
] as const;

export const EXERCISE_TYPE_OPTIONS = EXERCISE_TYPES.map((type) => ({
  label: type,
  value: type,
}));
```

- [ ] **Step 3: Initialize Firebase**

Create `C:\work\healthy-life\src\lib\firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

- [ ] **Step 4: Commit**

```bash
git add src/types/index.ts src/lib/firebase.ts src/lib/constants.ts
git commit -m "feat: set up firebase and typescript types"
```

---

## Task 3: Create Auth Context and Hooks

**Files:**
- Create: `src/lib/auth.ts`
- Create: `src/hooks/useAuth.ts`

- [ ] **Step 1: Create auth context and provider**

Create `C:\work\healthy-life\src\lib\auth.ts`:

```typescript
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
```

- [ ] **Step 2: Create useAuth hook**

Create `C:\work\healthy-life\src\hooks\useAuth.ts`:

```typescript
'use client';

import { useAuthContext } from '@/lib/auth';

export function useAuth() {
  return useAuthContext();
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/auth.ts src/hooks/useAuth.ts
git commit -m "feat: create auth context and hooks"
```

---

## Task 4: Create Auth Pages (Login/Signup)

**Files:**
- Create: `src/components/auth/AuthForm.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create root layout with AuthProvider**

Modify `C:\work\healthy-life\src\app\layout.tsx`:

```typescript
import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/auth';
import '@/globals.css';

export const metadata: Metadata = {
  title: '운동 기록',
  description: '매일 운동을 기록하세요',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create AuthForm component**

Create `C:\work\healthy-life\src\components\auth\AuthForm.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

type FormMode = 'login' | 'signup';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<FormMode>('login');
  const [loading, setLoading] = useState(false);
  const { login, signup, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      router.push('/dashboard');
    } catch (err) {
      // Error is handled by the context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">운동 기록</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? '처리중...' : mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {mode === 'login' ? (
            <>
              계정이 없으신가요?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-green-500 hover:underline"
              >
                회원가입
              </button>
            </>
          ) : (
            <>
              이미 계정이 있으신가요?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-green-500 hover:underline"
              >
                로그인
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create page.tsx (auth page)**

Create `C:\work\healthy-life\src\app\page.tsx`:

```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AuthForm from '@/components/auth/AuthForm';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>로딩중...</p>
      </div>
    );
  }

  return <AuthForm />;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/components/auth/AuthForm.tsx
git commit -m "feat: create auth pages with login/signup"
```

---

## Task 5: Create Exercise CRUD Operations

**Files:**
- Create: `src/lib/exercises.ts`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create utility functions for dates and calculations**

Create `C:\work\healthy-life\src\lib\utils.ts`:

```typescript
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00Z');
}

export function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

export function getEndOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + 6;
  return new Date(d.setDate(diff));
}

export function getDayOfWeek(dateStr: string): string {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const date = parseDate(dateStr);
  return days[date.getDay()];
}

export function getWeeksInMonth(date: Date): Array<Array<Date>> {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const weeks: Array<Array<Date>> = [];
  let week: Array<Date> = [];

  // Start from the first day of the first week
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  let current = new Date(startDate);
  while (current <= endDate) {
    week.push(new Date(current));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    current.setDate(current.getDate() + 1);
  }

  return weeks;
}
```

- [ ] **Step 2: Create Firestore exercise operations**

Create `C:\work\healthy-life\src/lib/exercises.ts`:

```typescript
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
import { formatDate } from './utils';

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

  return {
    id: docRef.id,
    date,
    type,
    duration,
    createdAt: now,
    updatedAt: now,
  };
}

export async function updateExercise(
  exerciseId: string,
  date: string,
  type: string,
  duration: number
): Promise<void> {
  const docRef = doc(db, EXERCISES_COLLECTION, exerciseId);
  const now = Timestamp.now().toMillis();
  await updateDoc(docRef, {
    date,
    type,
    duration,
    updatedAt: now,
  });
}

export async function deleteExercise(exerciseId: string): Promise<void> {
  const docRef = doc(db, EXERCISES_COLLECTION, exerciseId);
  await deleteDoc(docRef);
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

  const querySnapshot = await getDocs(q);
  const exercises: Exercise[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    exercises.push({
      id: doc.id,
      date: data.date,
      type: data.type,
      duration: data.duration,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  });

  return exercises;
}

export async function getExercisesByDate(
  userId: string,
  date: string
): Promise<Exercise[]> {
  const q = query(
    collection(db, EXERCISES_COLLECTION),
    where('userId', '==', userId),
    where('date', '==', date)
  );

  const querySnapshot = await getDocs(q);
  const exercises: Exercise[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    exercises.push({
      id: doc.id,
      date: data.date,
      type: data.type,
      duration: data.duration,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  });

  return exercises;
}

export function calculateDailyTotal(exercises: Exercise[]): number {
  return exercises.reduce((sum, ex) => sum + ex.duration, 0);
}

export function calculateWeekStats(exercises: Exercise[]) {
  const exerciseDays = new Set(exercises.map((ex) => ex.date)).size;
  const totalMinutes = exercises.reduce((sum, ex) => sum + ex.duration, 0);
  const averageMinutes = exerciseDays > 0 ? totalMinutes / exerciseDays : 0;

  return {
    exerciseDays,
    totalMinutes,
    averageMinutes: Math.round(averageMinutes * 10) / 10,
  };
}

export function calculateMonthStats(exercises: Exercise[]) {
  const exerciseDays = new Set(exercises.map((ex) => ex.date)).size;
  const totalMinutes = exercises.reduce((sum, ex) => sum + ex.duration, 0);
  const averageMinutes = exerciseDays > 0 ? totalMinutes / exerciseDays : 0;

  return {
    exerciseDays,
    totalMinutes,
    averageMinutes: Math.round(averageMinutes * 10) / 10,
  };
}
```

- [ ] **Step 3: Create useExercises hook**

Create `C:\work\healthy-life\src/hooks/useExercises.ts`:

```typescript
'use client';

import { useAuth } from './useAuth';
import { useCallback, useEffect, useState } from 'react';
import {
  addExercise,
  updateExercise,
  deleteExercise,
  getExercisesByDateRange,
  getExercisesByDate,
} from '@/lib/exercises';
import { Exercise } from '@/types';
import { formatDate } from '@/lib/utils';

export function useExercises() {
  const { user } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExercisesByDateRange = useCallback(
    async (startDate: string, endDate: string) => {
      if (!user) return;

      setLoading(true);
      try {
        const data = await getExercisesByDateRange(user.uid, startDate, endDate);
        setExercises(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const fetchExercisesByDate = useCallback(
    async (date: string) => {
      if (!user) return;

      try {
        const data = await getExercisesByDate(user.uid, date);
        return data;
      } catch (err: any) {
        setError(err.message);
        return [];
      }
    },
    [user]
  );

  const add = useCallback(
    async (date: string, type: string, duration: number) => {
      if (!user) return;

      try {
        const newExercise = await addExercise(user.uid, date, type, duration);
        setExercises([...exercises, newExercise]);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    [user, exercises]
  );

  const update = useCallback(
    async (
      exerciseId: string,
      date: string,
      type: string,
      duration: number
    ) => {
      try {
        await updateExercise(exerciseId, date, type, duration);
        setExercises(
          exercises.map((ex) =>
            ex.id === exerciseId ? { ...ex, date, type, duration } : ex
          )
        );
        setError(null);
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    [exercises]
  );

  const remove = useCallback(
    async (exerciseId: string) => {
      try {
        await deleteExercise(exerciseId);
        setExercises(exercises.filter((ex) => ex.id !== exerciseId));
        setError(null);
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    [exercises]
  );

  return {
    exercises,
    loading,
    error,
    fetchExercisesByDateRange,
    fetchExercisesByDate,
    add,
    update,
    remove,
  };
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/exercises.ts src/lib/utils.ts src/hooks/useExercises.ts
git commit -m "feat: create exercise crud operations and hooks"
```

---

## Task 6: Create Calendar Component with Heatmap

**Files:**
- Create: `src/components/dashboard/Calendar.tsx`

- [ ] **Step 1: Create Calendar heatmap component**

Create `C:\work\healthy-life\src/components/dashboard/Calendar.tsx`:

```typescript
'use client';

import { Exercise } from '@/types';
import { getWeeksInMonth, formatDate } from '@/lib/utils';
import { useState } from 'react';

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

  // Create a map of date to total minutes for that day
  const exercisesByDate: Record<string, number> = {};
  exercises.forEach((ex) => {
    if (!exercisesByDate[ex.date]) {
      exercisesByDate[ex.date] = 0;
    }
    exercisesByDate[ex.date] += ex.duration;
  });

  const getColorIntensity = (minutes: number) => {
    if (minutes === 0) return 'bg-gray-100';
    if (minutes < 30) return 'bg-green-200';
    if (minutes < 60) return 'bg-green-400';
    if (minutes < 120) return 'bg-green-600';
    return 'bg-green-800';
  };

  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{monthYear}</h2>
        <div className="space-x-2">
          <button
            onClick={onPrevMonth}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            ◀
          </button>
          <button
            onClick={onNextMonth}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLabels.map((day) => (
          <div key={day} className="h-6 flex items-center justify-center text-xs font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="grid grid-cols-7 gap-1">
            {week.map((date) => {
              const dateStr = formatDate(date);
              const isCurrentMonth =
                date.getMonth() === month.getMonth();
              const minutes = exercisesByDate[dateStr] || 0;
              const isExerciseDay = minutes > 0;

              return (
                <button
                  key={dateStr}
                  onClick={() => onDateClick(dateStr)}
                  className={`
                    h-12 rounded text-xs font-medium
                    ${isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
                    ${getColorIntensity(minutes)}
                    ${isExerciseDay ? 'cursor-pointer hover:opacity-80' : 'cursor-pointer'}
                    transition-opacity
                  `}
                  title={isExerciseDay ? `${minutes}분` : '운동 없음'}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 text-xs text-gray-600">
        <p className="mb-2 font-medium">운동 시간</p>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <span>없음</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-200 rounded"></div>
            <span>&lt;30분</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <span>30-60분</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <span>60-120분</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-800 rounded"></div>
            <span>120분+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/dashboard/Calendar.tsx
git commit -m "feat: create calendar heatmap component"
```

---

## Task 7: Create Exercise Modal Component

**Files:**
- Create: `src/components/dashboard/ExerciseModal.tsx`

- [ ] **Step 1: Create modal component**

Create `C:\work\healthy-life\src/components/dashboard/ExerciseModal.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Exercise } from '@/types';
import { EXERCISE_TYPE_OPTIONS } from '@/lib/constants';
import { formatDate } from '@/lib/utils';

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
    setLoading(true);
    setError(null);

    try {
      await onAdd(newType, parseInt(newDuration, 10));
      setNewType('요가');
      setNewDuration('30');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (exerciseId: string) => {
    setLoading(true);
    setError(null);

    try {
      await onEdit(exerciseId, editType, parseInt(editDuration, 10));
      setEditingId(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (exerciseId: string) => {
    if (confirm('삭제하시겠습니까?')) {
      setLoading(true);
      setError(null);

      try {
        await onDelete(exerciseId);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditStart = (exercise: Exercise) => {
    setEditingId(exercise.id);
    setEditType(exercise.type);
    setEditDuration(exercise.duration.toString());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{date}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Existing exercises */}
        {dailyExercises.length > 0 && (
          <div className="mb-4 pb-4 border-b">
            <p className="text-sm font-medium mb-2">
              오늘의 운동: 총 {totalMinutes}분
            </p>
            <div className="space-y-2">
              {dailyExercises.map((exercise) => (
                <div key={exercise.id}>
                  {editingId === exercise.id ? (
                    <div className="flex gap-2">
                      <select
                        value={editType}
                        onChange={(e) => setEditType(e.target.value)}
                        className="flex-1 px-2 py-1 border rounded text-sm"
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
                        className="w-16 px-2 py-1 border rounded text-sm"
                      />
                      <button
                        onClick={() => handleEdit(exercise.id)}
                        disabled={loading}
                        className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">
                        {exercise.type} {exercise.duration}분
                      </span>
                      <div className="space-x-1">
                        <button
                          onClick={() => handleEditStart(exercise)}
                          className="px-2 py-1 bg-blue-400 text-white rounded text-xs hover:bg-blue-500"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(exercise.id)}
                          className="px-2 py-1 bg-red-400 text-white rounded text-xs hover:bg-red-500"
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

        {/* Add new exercise */}
        <form onSubmit={handleAdd} className="space-y-3">
          <p className="text-sm font-medium">새로운 운동 추가</p>

          <div>
            <label className="block text-xs font-medium mb-1">운동 종류</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-green-500"
            >
              {EXERCISE_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">
              운동 시간 (분)
            </label>
            <input
              type="number"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
              min="1"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded font-medium hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? '추가중...' : '추가하기'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/dashboard/ExerciseModal.tsx
git commit -m "feat: create exercise modal component"
```

---

## Task 8: Create Dashboard Header with Week Summary

**Files:**
- Create: `src/components/dashboard/Header.tsx`

- [ ] **Step 1: Create Header component**

Create `C:\work\healthy-life\src/components/dashboard/Header.tsx`:

```typescript
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
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="bg-white border-b p-4">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold">운동 기록</h1>
        <button
          onClick={handleLogout}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>

      <div className="bg-green-50 p-4 rounded-lg mb-4">
        <p className="text-lg font-medium text-green-900 mb-3">
          이번주 {exerciseDays}일 운동했어요 💪
        </p>

        <div className="flex gap-2">
          <button
            onClick={onAddClick}
            className="flex-1 bg-green-500 text-white py-2 rounded font-medium hover:bg-green-600"
          >
            운동 기록하기
          </button>
          <Link
            href="/stats"
            className="flex-1 bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-600 text-center"
          >
            통계 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/dashboard/Header.tsx
git commit -m "feat: create dashboard header component"
```

---

## Task 9: Create Dashboard Main Page

**Files:**
- Create: `src/app/dashboard/page.tsx`
- Create: `src/components/common/ProtectedRoute.tsx`

- [ ] **Step 1: Create ProtectedRoute wrapper**

Create `C:\work\healthy-life\src/components/common/ProtectedRoute.tsx`:

```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>로딩중...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
```

- [ ] **Step 2: Create dashboard page**

Create `C:\work\healthy-life\src/app/dashboard/page.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useExercises } from '@/hooks/useExercises';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import Calendar from '@/components/dashboard/Calendar';
import ExerciseModal from '@/components/dashboard/ExerciseModal';
import Header from '@/components/dashboard/Header';
import { formatDate, getStartOfWeek, getEndOfWeek } from '@/lib/utils';

export default function DashboardPage() {
  const { user } = useAuth();
  const { exercises, fetchExercisesByDateRange, add, update, remove } =
    useExercises();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weekExercises, setWeekExercises] = useState<any[]>([]);

  // Fetch exercises for current month
  useEffect(() => {
    if (!user) return;

    const start = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));
    const end = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0));

    fetchExercisesByDateRange(start, end);
  }, [user, currentMonth, fetchExercisesByDateRange]);

  // Calculate week stats
  useEffect(() => {
    const now = new Date();
    const weekStart = formatDate(getStartOfWeek(now));
    const weekEnd = formatDate(getEndOfWeek(now));

    const weekExs = exercises.filter((ex) => ex.date >= weekStart && ex.date <= weekEnd);
    setWeekExercises(weekExs);
  }, [exercises]);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

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

  const exerciseDays = new Set(weekExercises.map((ex) => ex.date)).size;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header exerciseDays={exerciseDays} onAddClick={handleAddClick} />

        <div className="p-4">
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/common/ProtectedRoute.tsx src/app/dashboard/page.tsx
git commit -m "feat: create dashboard page with calendar and modal"
```

---

## Task 10: Create Chart Components for Stats Page

**Files:**
- Create: `src/components/stats/WeekChart.tsx`
- Create: `src/components/stats/MonthChart.tsx`

- [ ] **Step 1: Create weekly bar chart**

Create `C:\work\healthy-life\src/components/stats/WeekChart.tsx`:

```typescript
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

  // Get exercises from this week
  const weekExercises = exercises.filter((ex) => {
    const exDate = new Date(ex.date);
    return exDate >= weekStart && exDate <= weekEnd;
  });

  // Create data for each day of the week
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const data: any[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    const dateStr = formatDate(date);

    const dayExercises = weekExercises.filter((ex) => ex.date === dateStr);
    const totalMinutes = dayExercises.reduce((sum, ex) => sum + ex.duration, 0);

    data.push({
      day: days[i],
      minutes: totalMinutes,
      date: dateStr,
    });
  }

  const chartData = {
    labels: data.map((d) => d.day),
    datasets: [
      {
        label: '운동 시간 (분)',
        data: data.map((d) => d.minutes),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(34, 197, 94, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: { size: 12, weight: 500 as const },
          padding: 15,
          color: '#374151',
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 12 },
          color: '#6B7280',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
      x: {
        ticks: {
          font: { size: 12, weight: 500 as const },
          color: '#374151',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const exerciseDays = new Set(data.filter((d) => d.minutes > 0).map((d) => d.date)).size;
  const totalMinutes = data.reduce((sum, d) => sum + d.minutes, 0);
  const avgMinutes = exerciseDays > 0 ? (totalMinutes / exerciseDays).toFixed(1) : '0';

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">📊 주간 통계</h3>

      <div className="mb-6">
        <Bar data={chartData} options={chartOptions} height={300} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">운동 일수</p>
          <p className="text-2xl font-bold text-green-600">{exerciseDays}일</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">총 시간</p>
          <p className="text-2xl font-bold text-blue-600">{totalMinutes}분</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">평균 시간</p>
          <p className="text-2xl font-bold text-purple-600">{avgMinutes}분</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create monthly line chart**

Create `C:\work\healthy-life\src/components/stats/MonthChart.tsx`:

```typescript
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

  // Get exercises from this month
  const monthExercises = exercises.filter((ex) => {
    const exDate = new Date(ex.date);
    return exDate >= monthStart && exDate <= monthEnd;
  });

  // Create cumulative data for each day
  const data: any[] = [];
  let cumulativeMinutes = 0;
  const daysInMonth = monthEnd.getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), i);
    const dateStr = formatDate(date);

    const dayExercises = monthExercises.filter((ex) => ex.date === dateStr);
    const dayMinutes = dayExercises.reduce((sum, ex) => sum + ex.duration, 0);
    cumulativeMinutes += dayMinutes;

    data.push({
      day: i,
      cumulative: cumulativeMinutes,
      date: dateStr,
    });
  }

  const chartData = {
    labels: data.map((d) => `${d.day}일`),
    datasets: [
      {
        label: '누적 운동 시간 (분)',
        data: data.map((d) => d.cumulative),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        hoverBackgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: { size: 12, weight: 500 as const },
          padding: 15,
          color: '#374151',
        },
      },
      title: {
        display: false,
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 12 },
          color: '#6B7280',
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
      x: {
        ticks: {
          font: { size: 10 },
          color: '#6B7280',
          maxRotation: 45,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const exerciseDays = new Set(monthExercises.map((ex) => ex.date)).size;
  const totalMinutes = monthExercises.reduce((sum, ex) => sum + ex.duration, 0);
  const avgMinutes = exerciseDays > 0 ? (totalMinutes / exerciseDays).toFixed(1) : '0';

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">📊 월간 통계</h3>

      <div className="mb-6">
        <Line data={chartData} options={chartOptions} height={350} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">운동 일수</p>
          <p className="text-2xl font-bold text-green-600">{exerciseDays}일</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">총 시간</p>
          <p className="text-2xl font-bold text-blue-600">{totalMinutes}분</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">평균 시간</p>
          <p className="text-2xl font-bold text-purple-600">{avgMinutes}분</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/stats/WeekChart.tsx src/components/stats/MonthChart.tsx
git commit -m "feat: create chart components for statistics"
```

---

## Task 11: Create Stats Page

**Files:**
- Create: `src/app/stats/page.tsx`

- [ ] **Step 1: Create stats page**

Create `C:\work\healthy-life\src/app/stats/page.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useExercises } from '@/hooks/useExercises';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import Link from 'next/link';
import WeekChart from '@/components/stats/WeekChart';
import MonthChart from '@/components/stats/MonthChart';
import { formatDate, getStartOfMonth, getEndOfMonth } from '@/lib/utils';

export default function StatsPage() {
  const { user } = useAuth();
  const { exercises, fetchExercisesByDateRange } = useExercises();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const now = new Date();
    const monthStart = formatDate(getStartOfMonth(now));
    const monthEnd = formatDate(getEndOfMonth(now));

    fetchExercisesByDateRange(monthStart, monthEnd).then(() => {
      setLoading(false);
    });
  }, [user, fetchExercisesByDateRange]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <p>로딩중...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b p-4">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ←
            </Link>
            <h1 className="text-2xl font-bold">통계</h1>
          </div>
        </div>

        <div className="p-4">
          <WeekChart exercises={exercises} />
          <MonthChart exercises={exercises} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/stats/page.tsx
git commit -m "feat: create statistics page with charts"
```

---

## Task 12: Set Up Environment Variables and Firebase

**Files:**
- Modify: `.env.local`

- [ ] **Step 1: Create Firebase project**

Visit https://firebase.google.com and:
1. Click "Get Started"
2. Create a new project
3. Enable Firestore Database (Start in test mode)
4. Enable Authentication (Email/Password)
5. Go to Project Settings and copy Web SDK credentials

- [ ] **Step 2: Update `.env.local`**

Edit `C:\work\healthy-life\.env.local` with your Firebase credentials:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

- [ ] **Step 3: Test auth flow**

```bash
npm run dev
```

Go to `http://localhost:3000`, create an account, and verify you can access the dashboard.

- [ ] **Step 4: Test Firestore access**

In Firebase Console, go to Firestore Database and verify the `exercises` collection is created after adding an exercise.

- [ ] **Step 5: Commit**

```bash
git add .env.local
git commit -m "chore: configure firebase environment variables"
```

---

## Task 13: Deploy to Vercel

**Files:**
- Modify: `.gitignore`
- Create: `vercel.json` (optional)

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/healthy-life.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Deploy to Vercel**

Visit https://vercel.com and:
1. Click "New Project"
2. Import your GitHub repository
3. In Environment Variables, add all `NEXT_PUBLIC_*` values from `.env.local`
4. Click "Deploy"

- [ ] **Step 3: Verify deployment**

Visit your Vercel URL and test the app end-to-end:
- Sign up with email/password
- Add exercise records
- Check calendar heatmap
- View statistics
- Test date navigation

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "chore: final deployment setup"
```

---

## Verification Checklist

Before considering this complete, verify:

- ✅ User authentication (signup/login/logout)
- ✅ Exercise CRUD (add, edit, delete)
- ✅ Calendar heatmap displays correctly
- ✅ Month navigation works
- ✅ Modal opens on date click
- ✅ Week summary shows correct days
- ✅ Statistics page shows both charts
- ✅ Responsive design on mobile and desktop
- ✅ Deployed to Vercel and accessible via public URL
- ✅ Firebase Firestore storing data correctly
