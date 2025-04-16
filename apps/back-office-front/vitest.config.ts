
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/*.test.jest.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    cache: false,
    // globals: true,
    // Vitest가 전역 테스트 함수(describe, test, expect 등)를 자동으로 주입할지 여부를 결정합니다.
    // true로 설정하면 import 없이 이러한 함수들을 사용할 수 있습니다.

    // environment: 'node',
    // 테스트 환경을 설정합니다. 'node'는 Node.js 환경에서 테스트를 실행합니다.
    // 다른 옵션으로는 'jsdom' (브라우저와 유사한 환경) 등이 있습니다.

    // include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // 테스트 파일로 간주할 파일 패턴을 지정합니다.
    // 위 패턴은 .test 또는 .spec으로 끝나는 모든 JavaScript/TypeScript 파일을 포함합니다.

    // exclude: ['**/*.test.jest.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // 테스트에서 제외할 파일 패턴을 지정합니다.
    // 위 패턴은 .test.jest로 끝나는 파일을 제외합니다 (Jest용 테스트 파일).

    // cache: false,
    // 테스트 캐시를 비활성화합니다. true로 설정하면 이전 실행의 결과를 캐시하여 성능을 향상시킬 수 있습니다.

    // threads: true,
    // 멀티 스레딩을 활성화합니다. 기본값은 true입니다.
    // false로 설정하면 싱글 스레드에서 테스트가 실행됩니다.

    // maxThreads: 4,
    // maxWorkers: 4,
    // 사용할 최대 스레드/워커 수를 지정합니다. 기본값은 사용 가능한 CPU 코어 수에 따라 결정됩니다.

    // minThreads: 1,
    // 사용할 최소 스레드 수를 지정합니다.

    // coverage: {
    //   provider: 'c8', // 또는 'istanbul'
    //   reporter: ['text', 'json', 'html'],
    // },
    // 코드 커버리지 설정입니다. provider는 사용할 커버리지 도구를, reporter는 결과 보고 형식을 지정합니다.

    // testTimeout: 5000,
    // 각 테스트의 타임아웃 시간을 밀리초 단위로 설정합니다. 기본값은 5000ms입니다.

    // hookTimeout: 10000,
    // 훅(beforeEach, afterEach 등)의 타임아웃 시간을 밀리초 단위로 설정합니다.

    // isolate: true,
    // 각 테스트 파일을 격리된 환경에서 실행할지 여부를 결정합니다. 기본값은 true입니다.

    // watch: false,
    // watch 모드 활성화 여부를 설정합니다. true로 설정하면 파일 변경 시 자동으로 테스트를 재실행합니다.

    // update: false,
    // 스냅샷 자동 업데이트 여부를 설정합니다. true로 설정하면 변경된 스냅샷을 자동으로 업데이트합니다.
  },
});
