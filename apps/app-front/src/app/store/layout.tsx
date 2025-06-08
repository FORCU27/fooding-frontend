import StoreProvider from '@/components/Provider/StoreProvider';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
