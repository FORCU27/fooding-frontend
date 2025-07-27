import { Tag } from '@repo/design-system/components/b2c';

import { cn } from '@/utils/cn';
import { getStorePostTagColor } from '@/utils/store-post';

type StoreTagListProps = {
  className?: string;
  tags: string[];
};

export const StoreTagList = ({ className, tags }: StoreTagListProps) => {
  return (
    <div className={cn('flex gap-1', className)}>
      {tags.map((tag, index) => (
        <Tag key={index} variant={getStorePostTagColor(tag)}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};
