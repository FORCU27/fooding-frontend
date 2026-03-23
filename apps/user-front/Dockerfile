FROM public.ecr.aws/docker/library/node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=user-front --docker

FROM public.ecr.aws/docker/library/node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable
RUN corepack prepare yarn@4.3.0 --activate

COPY ./.yarnrc.yml .
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn add sharp@^0.33.2 && yarn install

ARG NODE_ENV
ARG COMMIT_HASH
ARG API_SERVER_URL
ARG NEXT_PUBLIC_OAUTH_REDIRECT_URI
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_KAKAO_CLIENT_ID
ARG NEXT_PUBLIC_NAVER_CLIENT_ID
ARG NEXT_PUBLIC_APPLE_CLIENT_ID
ARG NEXT_PUBLIC_KAKAO_JS_KEY

ENV NODE_ENV=$NODE_ENV \
    COMMIT_HASH=$COMMIT_HASH \
    NEXT_PUBLIC_API_URL=$API_SERVER_URL \
    NEXT_PUBLIC_OAUTH_REDIRECT_URI=$NEXT_PUBLIC_OAUTH_REDIRECT_URI \
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID \
    NEXT_PUBLIC_KAKAO_CLIENT_ID=$NEXT_PUBLIC_KAKAO_CLIENT_ID \
    NEXT_PUBLIC_NAVER_CLIENT_ID=$NEXT_PUBLIC_NAVER_CLIENT_ID \
    NEXT_PUBLIC_APPLE_CLIENT_ID=$NEXT_PUBLIC_APPLE_CLIENT_ID \
    NEXT_PUBLIC_KAKAO_JS_KEY=$NEXT_PUBLIC_KAKAO_JS_KEY \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/out/full/ .
RUN yarn workspace user-front build

FROM public.ecr.aws/docker/library/node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=installer /app/apps/user-front/public ./public
COPY --from=installer --chown=nextjs:nodejs /app/apps/user-front/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/user-front/.next/static ./apps/user-front/.next/static

ENV NODE_ENV=production \
    HOSTNAME="0.0.0.0" \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ping || exit 1

CMD ["node", "apps/user-front/server.js"]
