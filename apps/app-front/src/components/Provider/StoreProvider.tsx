// apps/app-front/src/components/Provider/StoreProvider.tsx
import { StoreClientProvider } from './StoreClientProvider';
import { getSelectedStoreId } from '@/services/locale';

export default async function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeId = await getSelectedStoreId();

  return <StoreClientProvider initialStoreId={storeId ?? null}>{children}</StoreClientProvider>;
}
