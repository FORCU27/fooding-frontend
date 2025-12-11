# Spinner 컴포넌트 마이그레이션

인라인 `animate-spin` 스피너를 `@repo/design-system` Spinner 컴포넌트로 교체

## 사용법

```tsx
import { Spinner } from '@repo/design-system/ceo';

// 기본
<Spinner />

// 사이즈: sm(24px), md(32px), lg(48px)
<Spinner size="lg" />

// 텍스트 포함
<Spinner text="로딩 중..." />
```

---

## 마이그레이션 체크리스트

### 메인
- [x] `src/app/my/page.tsx` - 정적 데이터 (로딩 불필요)

### Store 관련 (6개)
- [x] `src/app/my/store/basic/page.tsx`
- [x] `src/app/my/store/menus/page.tsx`
- [x] `src/app/my/store/additional/page.tsx`
- [x] `src/app/my/store/facilities/page.tsx` - 플레이스홀더 (로딩 불필요)
- [x] `src/app/my/store/photo/page.tsx` - isFetching 사용하지만 PhotoUploader로 대체
- [x] `src/app/my/store/seatGuide/page.tsx` - form만 (로딩 불필요)

### Reward - Coupon (5개)
- [x] `src/app/my/reward/coupon/page.tsx`
- [x] `src/app/my/reward/coupon/[id]/page.tsx`
- [x] `src/app/my/reward/coupon/create/page.tsx`
- [x] `src/app/my/reward/coupon/edit/[id]/page.tsx`
- [x] `src/app/my/reward/coupon/gift/page.tsx`

### Reward - Point (1개)
- [x] `src/app/my/reward/point/page.tsx`

### Reward - Pointshop (4개)
- [x] `src/app/my/reward/pointshop/page.tsx`
- [x] `src/app/my/reward/pointshop/[id]/page.tsx`
- [x] `src/app/my/reward/pointshop/[id]/modify/page.tsx` - EmptyState로 처리
- [x] `src/app/my/reward/pointshop/create/page.tsx` - form만 (로딩 불필요)

### Regular (5개)
- [x] `src/app/my/regular/favorite/page.tsx`
- [x] `src/app/my/regular/news/page.tsx`
- [x] `src/app/my/regular/news/create/page.tsx` - form만 (로딩 불필요)
- [x] `src/app/my/regular/news/[id]/edit/page.tsx`
- [x] `src/app/my/regular/review/page.tsx` - 플레이스홀더 (로딩 불필요)

### Devices (2개)
- [x] `src/app/my/devices/page.tsx`
- [x] `src/app/my/devices/[id]/page.tsx`

### 기타 (3개)
- [x] `src/app/my/notifications/page.tsx`
- [x] `src/app/my/news/page.tsx` - 플레이스홀더 (로딩 불필요)
- [x] `src/app/my/statistics/page.tsx` - 플레이스홀더 (로딩 불필요)

---

## 추가 완료 항목

### 전역 로딩
- [x] ~~`src/app/my/loading.tsx`~~ - 삭제됨 (페이지별 Spinner로 통일)

---

## 진행 상황

- 총: 27개 파일
- Spinner 적용 완료: **18개**
  - animate-spin → Spinner 교체: 12개
  - 텍스트 로딩 → Spinner 교체: 3개 (pointshop 2개, news/edit 1개)
  - 신규 Spinner 추가: 3개 (photo, favorite, news)
- loading.tsx: 삭제됨 (페이지별 Spinner로 통일)
- 로딩 불필요 페이지: 9개 (플레이스홀더, form, 정적 데이터)

### 마이그레이션 완료!
