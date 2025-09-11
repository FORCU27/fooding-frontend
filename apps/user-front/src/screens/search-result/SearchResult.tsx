import { ActivityComponentType } from '@stackflow/react/future';
import { Suspense } from '@suspensive/react';

import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';

export type SearchResultScreenParams = {
  keyword: string;
  regions: string[];
};

export const SearchResultScreen: ActivityComponentType<'SearchResultScreen'> = ({ params }) => {
  return (
    <Screen header={<Header left={<Header.Back />} />}>
      <Suspense>
        <SearchResult keyword={params.keyword} regions={params.regions} />
      </Suspense>
    </Screen>
  );
};

type SearchResultProps = {
  keyword: string;
  regions: string[];
};

const SearchResult = ({ keyword, regions }: SearchResultProps) => {
  return (
    <div>
      검색 결과 {keyword} {regions.join(', ')}
    </div>
  );
};
