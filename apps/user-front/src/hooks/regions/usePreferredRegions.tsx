import { useState } from 'react';

import { createContext } from '@repo/design-system/utils';
import { Suspense } from '@suspensive/react';
import { z } from 'zod/v4';

const STORAGE_KEY = 'preferredRegions';

type Region = z.infer<typeof Region>;
const Region = z.object({
  id: z.string(),
  name: z.string(),
});

type PreferredRegionsContextValue = {
  preferredRegions: Region[];
  changePreferredRegions: (regions: Region[]) => void;
};

const [PreferredRegionsContext, usePreferredRegionsContext] =
  createContext<PreferredRegionsContextValue>('PreferredRegions');

export const PreferredRegionsProvider = Suspense.with(
  { fallback: null, clientOnly: true },
  ({ children }: { children: React.ReactNode }) => {
    const initialPreferredRegions = (() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
          return [];
        }

        return z.array(Region).parse(JSON.parse(stored));
      } catch {
        return [];
      }
    })();

    const [preferredRegions, setPreferredRegions] = useState<Region[]>(initialPreferredRegions);

    const changePreferredRegions = (regions: Region[]) => {
      setPreferredRegions(regions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(regions));
    };

    return (
      <PreferredRegionsContext value={{ preferredRegions, changePreferredRegions }}>
        {children}
      </PreferredRegionsContext>
    );
  },
);

export const usePreferredRegions = () => {
  const context = usePreferredRegionsContext();

  return context;
};
