import { cn } from '@/utils/cn';
import React from 'react';

type SubwayLine =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | '공항'
  | '경의중앙'
  | '경촌'
  | '수인분당'
  | '신분당'
  | '경강'
  | '서해'
  | '인천 1'
  | '인천 2'
  | '에버라인'
  | '의정부'
  | '우이신설'
  | '김포골드'
  | '신림'
  | 'GTX-A';

const subwayLineColor: Record<SubwayLine, string> = {
  1: 'bg-[#263C96]',
  2: 'bg-[#3DB449]',
  3: 'bg-[#F06E00]',
  4: 'bg-[#2D9EDF]',
  5: 'bg-[#8936E0]',
  6: 'bg-[#B6500B]',
  7: 'bg-[#697214]',
  8: 'bg-[#E51E6E]',
  9: 'bg-[#D1A62C]',
  공항: 'bg-[#73B6E4]',
  경의중앙: 'bg-[#7CC4A5]',
  경촌: 'bg-[#0AAF7B]',
  수인분당: 'bg-[#EBA900]',
  신분당: 'bg-[#A71E31]',
  경강: 'bg-[#2773F2]',
  서해: 'bg-[#8BC540]',
  '인천 1': 'bg-[#6F99D0]',
  '인천 2': 'bg-[#F4AB3E]',
  에버라인: 'bg-[#78C372]',
  의정부: 'bg-[#FF9D26]',
  우이신설: 'bg-[#C6C100]',
  김포골드: 'bg-[#96710C]',
  신림: 'bg-[#4E67A5]',
  'GTX-A': 'bg-[#905A89]',
};

type SubwayLineBadgeProps = React.ComponentPropsWithRef<'span'> & {
  line: SubwayLine;
};

export const SubwayLineBadge = ({ line, className, ...props }: SubwayLineBadgeProps) => {
  switch (line) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return (
        <NumberBadge className={cn(subwayLineColor[line], className)} number={line} {...props} />
      );
    case '공항':
    case '경의중앙':
    case '경촌':
    case '수인분당':
    case '신분당':
    case '경강':
    case '서해':
    case '인천 1':
    case '인천 2':
    case '에버라인':
    case '의정부':
    case '우이신설':
    case '김포골드':
    case '신림':
    case 'GTX-A':
      return <TextBadge className={cn(subwayLineColor[line], className)} text={line} {...props} />;
    default:
      line satisfies never;
  }
};

type NumberBadgeProps = React.ComponentPropsWithRef<'span'> & {
  number: number;
};

const NumberBadge = ({ className, number, ...props }: NumberBadgeProps) => {
  return (
    <span
      className={cn(
        'size-[16px] rounded-full flex justify-center items-center text-white text-[10px] font-semibold',
        className,
      )}
      {...props}
    >
      {number}
    </span>
  );
};

type TextBadgeProps = React.ComponentPropsWithRef<'span'> & {
  text: string;
};

const TextBadge = ({ className, text, ...props }: TextBadgeProps) => {
  return (
    <span
      className={cn(
        'h-[16px] px-[5px] rounded-full flex justify-center items-center text-white text-[10px] font-semibold',
        className,
      )}
      {...props}
    >
      {text}
    </span>
  );
};
