FROM public.ecr.aws/docker/library/node:20-alpine AS builder
# FROM public.ecr.aws/docker/library/node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=back-office-front --docker

FROM public.ecr.aws/docker/library/node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

RUN corepack enable
RUN corepack prepare yarn@4.3.0 --activate

COPY ./.yarnrc.yml .
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn add sharp@^0.33.2 && yarn install

# Build the project
ARG NODE_ENV
ARG COMMIT_HASH
ARG API_SERVER_URL
ARG NEXT_PUBLIC_OAUTH_REDIRECT_URI
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_KAKAO_CLIENT_ID
ARG NEXT_PUBLIC_NAVER_CLIENT_ID
ARG NEXT_PUBLIC_APPLE_CLIENT_ID

ENV NODE_ENV=$NODE_ENV \
    COMMIT_HASH=$COMMIT_HASH \
    NEXT_PUBLIC_API_URL=$API_SERVER_URL \
    NEXT_PUBLIC_OAUTH_REDIRECT_URI=$NEXT_PUBLIC_OAUTH_REDIRECT_URI \
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID \
    NEXT_PUBLIC_KAKAO_CLIENT_ID=$NEXT_PUBLIC_KAKAO_CLIENT_ID \
    NEXT_PUBLIC_NAVER_CLIENT_ID=$NEXT_PUBLIC_NAVER_CLIENT_ID \
    NEXT_PUBLIC_APPLE_CLIENT_ID=$NEXT_PUBLIC_APPLE_CLIENT_ID \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/out/full/ .
COPY apps/back-office-front/package.json apps/back-office-front/package.json

# 디버깅을 위한 정보 출력
RUN set -x && ls -la
RUN set -x && pwd
RUN set -x && cat package.json
RUN set -x && yarn workspaces list
RUN set -x && cat apps/back-office-front/package.json

# packages/ui의 React 버전을 back-office-front와 맞추기 위한 작업
# RUN cd packages/ui && yarn add react@^18 react-dom@^18 --peer

# UI 패키지 먼저 빌드
# RUN yarn workspace @repo/ui build

# Next.js 캐시 정리 후 빌드
RUN cd apps/back-office-front && rm -rf .next
# NODE_ENV=production 
RUN yarn workspace back-office-front build
# RUN NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production yarn turbo run build --filter=back-office-front   

CMD ["yarn", "workspace", "back-office-front", "start"]