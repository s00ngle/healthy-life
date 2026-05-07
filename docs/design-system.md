# 운동 기록 앱 | 현대적 미니멀 디자인 시스템

---

## 1. 디자인 비전

이 앱은 **의도적 단순성**과 **감정적 연결**을 추구합니다. 불필요한 요소를 제거하고 사용자의 운동 여정을 명확하게 시각화하는 우아한 인터페이스입니다. 따뜻한 회색 톤과 생기 있는 그린 톤의 조화로 일상의 성취감을 자연스럽게 표현합니다.

---

## 2. 컬러 팔레트

### 2.1 핵심 색상 (Primary & Secondary)

```css
/* 프라이머리: 따뜻한 민트 그린 (실행/성취감) */
--color-primary-50: #f0fdf9;
--color-primary-100: #ccfbea;
--color-primary-200: #99f6d3;
--color-primary-300: #5ee7ca;
--color-primary-400: #2dd4bf;
--color-primary-500: #14b8a6;    /* 메인 */
--color-primary-600: #0d9488;    /* 호버/포커스 */
--color-primary-700: #0f766e;    /* 활성/강조 */
--color-primary-800: #134e4a;    /* 다크 모드용 */

/* 뉴트럴: 우아한 회색 톤 */
--color-neutral-50: #f9fafb;
--color-neutral-100: #f3f4f6;
--color-neutral-200: #e5e7eb;
--color-neutral-300: #d1d5db;
--color-neutral-400: #9ca3af;
--color-neutral-500: #6b7280;    /* 바디 텍스트 */
--color-neutral-600: #4b5563;    /* 보조 텍스트 */
--color-neutral-700: #374151;    /* 강조 텍스트 */
--color-neutral-800: #1f2937;    /* 헤딩 */
--color-neutral-900: #111827;    /* 최고 강조 */

/* 세맨틱: 상태 및 피드백 */
--color-success: #10b981;    /* 성공 */
--color-warning: #f59e0b;    /* 경고 */
--color-error: #ef4444;      /* 에러 */
--color-info: #3b82f6;       /* 정보 */

/* 배경 레이어 */
--color-bg-primary: #ffffff;
--color-bg-secondary: #f9fafb;
--color-bg-tertiary: #f3f4f6;

/* 테두리 */
--color-border: #e5e7eb;
```

### 2.2 색상 사용 가이드

| 요소 | 색상 | 명도 | 용도 |
|------|------|------|------|
| 액션 버튼 | Primary-600 | 중간 | 클릭 가능 요소 강조 |
| 활성 상태 | Primary-700 | 어두움 | 선택/활성 인디케이터 |
| 운동 기록됨 | Primary-500 | 생생함 | 캘린더 히트맵, 성공 인디케이터 |
| 본문 텍스트 | Neutral-600 | 중간 | 기본 텍스트 |
| 헤딩 | Neutral-800 | 어두움 | 페이지/섹션 제목 |
| 배경 | Neutral-50 | 밝음 | 프라이머리 배경 |
| 카드 배경 | White | 밝음 | 콘텐츠 컨테이너 |
| 구분선 | Neutral-200 | 밝음 | 시각적 계층 분리 |

---

## 3. 타이포그래피

### 3.1 폰트 스택

```css
/* 한글 + 영문 혼합 스택 (한글 우선) */
--font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', sans-serif;

/* Pretendard: 한글 최적화, 모던하고 가독성 높음 */
/* Fallback: Apple의 시스템 폰트 > Segoe UI > Roboto 순서 */

/* 숫자/금액 표시용 (모노스페이스) */
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### 3.2 타이포그래피 스케일

```css
/* 제목 계층 */
--text-h1-size: 2.5rem;        /* 32px */
--text-h1-weight: 700;
--text-h1-line-height: 1.2;
--text-h1-letter-spacing: -0.02em;

--text-h2-size: 2rem;          /* 28px */
--text-h2-weight: 700;
--text-h2-line-height: 1.25;
--text-h2-letter-spacing: -0.01em;

--text-h3-size: 1.5rem;        /* 24px */
--text-h3-weight: 600;
--text-h3-line-height: 1.33;

--text-h4-size: 1.25rem;       /* 20px */
--text-h4-weight: 600;
--text-h4-line-height: 1.4;

/* 본문 텍스트 */
--text-body-lg-size: 1.125rem;   /* 18px */
--text-body-lg-weight: 400;
--text-body-lg-line-height: 1.5;

--text-body-size: 1rem;          /* 16px (기본) */
--text-body-weight: 400;
--text-body-line-height: 1.5;

--text-body-sm-size: 0.875rem;   /* 14px */
--text-body-sm-weight: 400;
--text-body-sm-line-height: 1.5;

/* 라벨/헬퍼 */
--text-label-size: 0.75rem;      /* 12px */
--text-label-weight: 500;
--text-label-line-height: 1.33;
--text-label-letter-spacing: 0.01em;
```

---

## 4. 간격 및 그리드 시스템

### 4.1 스페이싱 스케일 (8px 기반)

```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
```

### 4.2 레이아웃 패턴

**모바일 (< 768px)**
- 컨테이너 좌우 패딩: 16px
- 섹션 간 간격: 24px
- 컴포넌트 내부 패딩: 16px

**태블릿 (768px ~ 1024px)**
- 컨테이너 좌우 패딩: 24px
- 섹션 간 간격: 32px
- 최대 너비: 800px

**데스크톱 (> 1024px)**
- 컨테이너 좌우 패딩: 32px
- 섹션 간 간격: 48px
- 최대 너비: 1200px

---

## 5. 컴포넌트 설계

### 5.1 버튼

#### 프라이머리 버튼 (메인 액션)
```css
.btn-primary {
  padding: 0.75rem 1.5rem;           /* 12-24px */
  background-color: var(--color-primary-600);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;             /* 8px */
  border: none;
  transition: all 0.2s ease-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background-color: var(--color-primary-700);
    box-shadow: 0 4px 6px rgba(20, 184, 166, 0.15);
    transform: translateY(-1px);
  }
  
  &:active {
    background-color: var(--color-primary-800);
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: var(--color-neutral-300);
    color: var(--color-neutral-500);
    cursor: not-allowed;
    box-shadow: none;
  }
}
```

#### 세컨더리 버튼 (보조 액션)
```css
.btn-secondary {
  padding: 0.75rem 1.5rem;
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-800);
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: 1px solid var(--color-neutral-200);
  transition: all 0.2s ease-out;
  
  &:hover {
    background-color: var(--color-neutral-200);
    border-color: var(--color-neutral-300);
  }
  
  &:active {
    background-color: var(--color-neutral-300);
  }
}
```

#### 텍스트 버튼 (경량)
```css
.btn-text {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: var(--color-primary-600);
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: 0.375rem;
  transition: all 0.2s ease-out;
  
  &:hover {
    background-color: var(--color-primary-50);
    color: var(--color-primary-700);
  }
}
```

#### 아이콘 버튼 (원형, 작은 액션)
```css
.btn-icon {
  width: 2.5rem;                     /* 40px */
  height: 2.5rem;
  padding: 0;
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-700);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  transition: all 0.2s ease-out;
  cursor: pointer;
  
  &:hover {
    background-color: var(--color-neutral-200);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
}
```

---

## 6. 애니메이션 및 인터랙션

### 6.1 트랜지션 타이밍

```css
/* 빠른 피드백 (100-200ms) */
--transition-fast: 100ms cubic-bezier(0.4, 0, 0.2, 1);

/* 일반 인터랙션 (200-300ms) */
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);

/* 느린 애니메이션 (300-500ms) */
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* 진입/퇴장 (ease-out이 더 자연스러움) */
--transition-enter: 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
--transition-exit: 200ms cubic-bezier(0.4, 0, 0.6, 1);
```

### 6.2 상호작용 패턴

**버튼 호버**
```css
/* 하강 + 그림자 증가 */
&:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

&:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
```

**입력 필드 포커스**
```css
/* 테두리 색상 변경 + 부드러운 글로우 */
border-color: var(--color-primary-500);
box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
transition: all 200ms ease-out;
```

---

## 7. TailwindCSS 설정 예시

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf9',
          100: '#ccfbea',
          200: '#99f6d3',
          300: '#5ee7ca',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#134e4a',
          900: '#0d3d3a',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.33' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.5' }],
        lg: ['1.125rem', { lineHeight: '1.5' }],
        xl: ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.33' }],
        '3xl': ['2rem', { lineHeight: '1.25' }],
        '4xl': ['2.5rem', { lineHeight: '1.2' }],
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
      },
      borderRadius: {
        sm: '0.375rem',
        base: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        base: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 8px 12px rgba(0, 0, 0, 0.1)',
        xl: '0 12px 24px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        fast: '100ms',
        base: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 0.6, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
};
```

---

## 8. 반응형 디자인 전략

### 8.1 브레이크포인트

```css
/* 모바일-퍼스트 접근 */
/* 모바일 (< 640px) - 기본값 */
/* 태블릿 (640px ~ 1024px) */
/* 데스크톱 (> 1024px) */

@media (min-width: 640px) { /* 태블릿 */ }
@media (min-width: 1024px) { /* 데스크톱 */ }
```

### 8.2 터치 타겟 최소 크기

```css
/* 터치 기기 (모바일/태블릿) */
--touch-target-min: 44px;           /* iOS/Android 권장 */

/* 버튼 */
.btn { min-height: 44px; min-width: 44px; }

/* 아이콘 버튼 */
.btn-icon { width: 44px; height: 44px; }
```

---

## 9. 접근성 (WCAG 2.1 AA)

### 9.1 색상 대비

- ✅ 텍스트 vs 배경: 최소 4.5:1 (일반 텍스트)
- ✅ 큰 텍스트 (18pt+): 최소 3:1
- ✅ UI 컴포넌트 (테두리/배경): 최소 3:1

### 9.2 포커스 상태

```css
/* 모든 인터랙티브 요소에 명확한 포커스 표시 */
&:focus-visible {
  outline: 2px solid var(--color-primary-600);
  outline-offset: 2px;
}
```

### 9.3 키보드 네비게이션

- ✅ Tab/Shift+Tab으로 모든 인터랙티브 요소 접근
- ✅ Enter/Space로 버튼 활성화
- ✅ 논리적 탭 순서

---

## 10. 요약

이 디자인 시스템은 **모던하고 미니멀하면서도 따뜻한** 인상을 줍니다:
- **색상**: Teal 그린 + Neutral 회색
- **타이포그래피**: Pretendard (한글 최적화)
- **간격**: 8px 기반 일관된 스케일
- **접근성**: WCAG 2.1 AA 준수
- **반응형**: 모바일-퍼스트 접근

모든 색상, 간격, 타이포그래피가 일관되어 있어 개발이 수월합니다.
