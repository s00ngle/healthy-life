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
