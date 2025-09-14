import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    /** 내용/닉네임처럼 남는 공간을 가져가야 하는 칼럼 */
    isText?: boolean;
    /** 고정 폭(px)/ 없으면 자동 분배 */
    width?: number;
    /** 텍스트 정렬 */
    align?: 'left' | 'center' | 'right';
  }
}
