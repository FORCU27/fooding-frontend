import React from 'react';

import { cn } from '@/utils/cn';

export type SubwayLine =
  | '1호선'
  | '2호선'
  | '3호선'
  | '4호선'
  | '5호선'
  | '6호선'
  | '7호선'
  | '8호선'
  | '9호선'
  | '공항철도'
  | '경의중앙선'
  | '경춘선'
  | '수인분당선'
  | '신분당선'
  | '경강선'
  | '서해선'
  | '인천 1호선'
  | '인천 2호선'
  | '에버라인'
  | '의정부선'
  | '우이신설선'
  | '김포골드'
  | '신림선'
  | 'GTX-A';

const subwayLineColor: Record<SubwayLine, string> = {
  '1호선': 'bg-[#263C96]',
  '2호선': 'bg-[#3DB449]',
  '3호선': 'bg-[#F06E00]',
  '4호선': 'bg-[#2D9EDF]',
  '5호선': 'bg-[#8936E0]',
  '6호선': 'bg-[#B6500B]',
  '7호선': 'bg-[#697214]',
  '8호선': 'bg-[#E51E6E]',
  '9호선': 'bg-[#D1A62C]',
  공항철도: 'bg-[#73B6E4]',
  경의중앙선: 'bg-[#7CC4A5]',
  경춘선: 'bg-[#0AAF7B]',
  수인분당선: 'bg-[#EBA900]',
  신분당선: 'bg-[#A71E31]',
  경강선: 'bg-[#2773F2]',
  서해선: 'bg-[#8BC540]',
  '인천 1호선': 'bg-[#6F99D0]',
  '인천 2호선': 'bg-[#F4AB3E]',
  에버라인: 'bg-[#78C372]',
  의정부선: 'bg-[#FF9D26]',
  우이신설선: 'bg-[#C6C100]',
  김포골드: 'bg-[#96710C]',
  신림선: 'bg-[#4E67A5]',
  'GTX-A': 'bg-[#905A89]',
};

type SubwayLineBadgeProps = React.ComponentPropsWithRef<'span'> & {
  line: SubwayLine;
};

export const SubwayLineBadge = ({ line, className, ...props }: SubwayLineBadgeProps) => {
  const numberOnly = line.replace('호선', '');

  switch (line) {
    case '1호선':
    case '2호선':
    case '3호선':
    case '4호선':
    case '5호선':
    case '6호선':
    case '7호선':
    case '8호선':
    case '9호선':
      return (
        <NumberBadge
          className={cn(subwayLineColor[line], className)}
          lineNumber={numberOnly}
          {...props}
        />
      );
    case '공항철도':
    case '경의중앙선':
    case '경춘선':
    case '수인분당선':
    case '신분당선':
    case '경강선':
    case '서해선':
    case '인천 1호선':
    case '인천 2호선':
    case '에버라인':
    case '의정부선':
    case '우이신설선':
    case '김포골드':
    case '신림선':
    case 'GTX-A':
      return <TextBadge className={cn(subwayLineColor[line], className)} text={line} {...props} />;
    default:
      line satisfies never;
  }
};

type NumberBadgeProps = React.ComponentPropsWithRef<'span'> & {
  lineNumber: string;
};

const NumberBadge = ({ className, lineNumber, ...props }: NumberBadgeProps) => {
  return (
    <span
      className={cn(
        'size-[16px] rounded-full flex justify-center items-center text-white text-[10px] font-semibold',
        className,
      )}
      {...props}
    >
      {lineNumber}
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
