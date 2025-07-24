type FormatOption = 'korean' | 'dot' | 'dash';
/**
 * ISO 8601을 특정 형식으로 변환합니다.
 *
 * @example
 * formatDate('2025-06-27T12:00:00Z', { format: 'korean' }) // "2025년 06월 27일"
 * formatDate('2023-06-27T12:00:00Z', { format: 'dot' }) // "2025.06.27"
 * formatDate('2023-06-27T12:00:00Z', { format: 'dash' }) // "2025-06-27"
 */
export const formatDate = (
  isoString: string,
  options?: {
    format?: FormatOption;
  },
): string => {
  const DEFAULT_FORMAT: FormatOption = 'korean';

  const format = options?.format ?? DEFAULT_FORMAT;

  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  const formattedDate: Record<FormatOption, string> = {
    korean: `${year}년 ${month}월 ${day}일`,
    dot: `${year}.${month}.${day}`,
    dash: `${year}-${month}-${day}`,
  };

  return formattedDate[format];
};

/**
 * ISO 8601 -> YYYY.MM.DD
 */

export const formatDotDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

/**
 * @param createdAt -> YYYY.MM.DD HH:mm
 */

export const formatDotDateTime = (isoString: string) => {
  const date = new Date(isoString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

/**
 * ISO 8601 -> 방금 전, 1시간 전, 2일 전 등
 */
export const formatRelativeTime = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();

  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInMs < 0) return '방금 전';
  if (diffInSeconds < 60) return '방금 전';
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  if (diffInDays < 30) return `${diffInDays}일 전`;
  if (diffInMonths < 12) return `${diffInMonths}개월 전`;
  return `${diffInYears}년 전`;
};

/**
 * 생성일로부터 20일 이내인지 판단
 * @param createdAt ISO 날짜 문자열
 * @returns 20일 이내면 true, 아니면 false
 */
export const isReviewWithin20Days = (createdAt: string): boolean => {
  const createdDate = new Date(createdAt);
  const today = new Date();

  const diffTime = today.getTime() - createdDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return diffDays <= 20;
};
