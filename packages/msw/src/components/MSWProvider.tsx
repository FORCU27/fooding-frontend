'use client';

import { useEffect, useState } from 'react';
import { SetupWorker, setupWorker } from 'msw/browser';
import { mockHandlerGroups } from '../handlers';
import { matchHandler, MockHandler, registerHandler } from '../utils/mock';
import { z } from 'zod/v4';
import { createContext } from '@repo/design-system/utils';
import { ClientOnly } from './ClientOnly';
import { MSWDevtool } from './MSWDevtool';

const STORAGE_KEY = 'enabledHandlerIds';

type EnabledHandler = z.infer<typeof EnabledHandler>;
const EnabledHandler = z.object({
  method: z.string(),
  path: z.string(),
  preset: z.string(),
});

type HandlerConfig = z.infer<typeof HandlerConfig>;
const HandlerConfig = z.object({
  enabledHandlers: z.array(EnabledHandler),
});

const defaultHandlerConfig: HandlerConfig = {
  enabledHandlers: [],
};

type MSWProviderProps = {
  children: React.ReactNode;
  devtools?: boolean;
  storageKey?: string;
};

export const MSWProvider = ({ children, devtools = true, storageKey }: MSWProviderProps) => {
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  return (
    <ClientOnly>
      <MSWProviderContent devtools={devtools} storageKey={storageKey}>
        {children}
      </MSWProviderContent>
    </ClientOnly>
  );
};

type MSWProviderContentProps = {
  children: React.ReactNode;
  devtools: boolean;
  storageKey?: string;
};

export const MSWProviderContent = ({ children, devtools, storageKey }: MSWProviderContentProps) => {
  const resolvedStorageKey = storageKey ?? STORAGE_KEY;

  const getInitialHandlerConfig = () => {
    try {
      const storedValue = window.localStorage.getItem(resolvedStorageKey);

      if (!storedValue) {
        return defaultHandlerConfig;
      }

      return HandlerConfig.parse(JSON.parse(storedValue));
    } catch (error) {
      localStorage.removeItem(resolvedStorageKey);
      return defaultHandlerConfig;
    }
  };

  const initialHandlerConfig = getInitialHandlerConfig();

  const [worker, setWorker] = useState<SetupWorker | null>(null);

  const [handlerConfig, setHandlerConfig] = useState<HandlerConfig>(initialHandlerConfig);

  const getEnabledHttpHandlers = (enabledHandlers: EnabledHandler[]) => {
    const allHandlers = mockHandlerGroups.map((handlerGroup) => handlerGroup.handlers).flat();

    const filteredHandlers = allHandlers
      .filter((handler) => {
        return enabledHandlers.some((enabledHandler) => matchHandler(enabledHandler, handler));
      })
      .map((handler) => {
        const usedPresetLabel = enabledHandlers.find((enabledHandler) =>
          matchHandler(enabledHandler, handler),
        )?.preset;

        const preset =
          handler.presets.find((preset) => preset.label === usedPresetLabel) ?? handler.presets[0];

        return {
          ...handler,
          preset,
        };
      });

    return registerHandler(filteredHandlers);
  };

  useEffect(() => {
    const startWorker = async () => {
      const enabledHttpHandlers = getEnabledHttpHandlers(handlerConfig.enabledHandlers);

      const worker = setupWorker(...enabledHttpHandlers);

      await worker.start({
        onUnhandledRequest: 'bypass',
      });

      setWorker(worker);
    };

    startWorker();
  }, []);

  const updateEnabledHandlers = (enabledHandlers: EnabledHandler[]) => {
    if (worker === null) {
      throw new Error('Worker가 초기화되기 전에 실행할 수 없습니다.');
    }

    const newConfig: HandlerConfig = {
      ...handlerConfig,
      enabledHandlers,
    };

    window.localStorage.setItem(resolvedStorageKey, JSON.stringify(newConfig));

    const enabledWorkerHandlers = getEnabledHttpHandlers(enabledHandlers);

    setHandlerConfig(newConfig);

    worker.resetHandlers();
    worker.use(...enabledWorkerHandlers);
  };

  const toggleHandlerEnabled = (handler: MockHandler) => {
    if (
      handlerConfig.enabledHandlers.some((enabledHandler) => matchHandler(enabledHandler, handler))
    ) {
      updateEnabledHandlers(handlerConfig.enabledHandlers.filter((h) => !matchHandler(h, handler)));
    } else {
      const matchedHandler = mockHandlerGroups
        .map((handlerGroup) => handlerGroup.handlers)
        .flat()
        .find((h) => {
          return matchHandler(handler, h);
        });

      if (!matchedHandler) {
        throw new Error(`해당하는 핸들러를 찾을 수 없습니다: ${handler.method} ${handler.path}`);
      }

      updateEnabledHandlers([
        ...handlerConfig.enabledHandlers,
        { ...handler, preset: handler.presets[0].label },
      ]);
    }
  };

  const changePreset = (handler: EnabledHandler) => {
    const updatedHandlers = handlerConfig.enabledHandlers.map((h) => {
      if (matchHandler(h, handler)) {
        return { ...h, preset: handler.preset };
      }
      return h;
    });

    updateEnabledHandlers(updatedHandlers);
  };

  if (worker === null) return null;

  return (
    <MSWProviderContext
      value={{
        handlerConfig,
        toggleHandlerEnabled,
        changePreset,
      }}
    >
      {devtools && <MSWDevtool />}
      {children}
    </MSWProviderContext>
  );
};

type MSWProviderContextValue = {
  handlerConfig: HandlerConfig;
  toggleHandlerEnabled: (handler: MockHandler) => void;
  changePreset: (handler: EnabledHandler) => void;
};

const [MSWProviderContext, useMSWProviderContext] =
  createContext<MSWProviderContextValue>('MSWProvider');

export { useMSWProviderContext };
