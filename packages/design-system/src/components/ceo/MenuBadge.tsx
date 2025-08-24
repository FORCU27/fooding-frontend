'use client';

import { cn } from '../../utils/cn';

export type BadgeType = '대표' | '추천' | '신규';

type MenuBadgeProps = {
  type: BadgeType;
  className?: string;
};

export const MenuBadge = ({ type, className }: MenuBadgeProps) => {
  return (
    <span
      className={cn(
        'text-xs px-2 py-0.5 rounded font-medium',
        type === '대표' && 'bg-primary-pink/10 text-primary-pink',
        type === '추천' && 'bg-fooding-green/10 text-fooding-green',
        type === '신규' && 'bg-fooding-blue/10 text-fooding-blue',
        className,
      )}
    >
      {type}
    </span>
  );
};

type MenuBadgeListProps = {
  badges?: BadgeType[];
  className?: string;
};

export const MenuBadgeList = ({ badges, className }: MenuBadgeListProps) => {
  if (!badges || badges.length === 0) return null;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {badges.map((badge) => (
        <MenuBadge key={badge} type={badge} />
      ))}
    </div>
  );
};
