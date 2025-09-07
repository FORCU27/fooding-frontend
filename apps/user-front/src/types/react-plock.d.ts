declare module 'react-plock' {
  import { ReactNode } from 'react';

  export interface MasonryProps<T> {
    items: T[];
    config: {
      columns: number[];
      gap: number[];
      media?: number[];
    };
    render: (item: T, index: number) => ReactNode;
    className?: string;
  }

  export function Masonry<T>(props: MasonryProps<T>): JSX.Element;
}