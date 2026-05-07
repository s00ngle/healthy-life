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
