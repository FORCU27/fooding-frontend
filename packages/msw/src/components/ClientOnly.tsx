import { useSyncExternalStore } from 'react';

type ClientOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const { isClient } = useIsClient();

  if (!isClient) {
    return fallback;
  }

  return <>{children}</>;
};

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const useIsClient = () => {
  const isClient = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  return { isClient };
};
