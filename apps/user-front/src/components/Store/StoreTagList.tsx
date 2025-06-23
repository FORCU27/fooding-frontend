import { Tag } from '@repo/design-system/components/b2c';

import { cn } from '@/utils/cn';

type StoreTagListProps = {
  className?: string;
  tags: string[];
};

const getTagVariant = (tag: string) => {
  if (tag === '대표') return 'red';

  return 'gray';
};

export const StoreTagList = ({ className, tags }: StoreTagListProps) => {
  return (
    <div className={cn('flex gap-1', className)}>
      {tags.map((tag, index) => (
        <Tag key={index} variant={getTagVariant(tag)}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};
