import { ActivityComponentType } from '@stackflow/react/future';

import BottomTab from '@/components/Layout/BottomTab';
import { Screen } from '@/components/Layout/Screen';

export const SearchTab: ActivityComponentType<'SearchTab'> = () => {
  return <Screen bottomTab={<BottomTab currentTab='search' />}>Search</Screen>;
};
