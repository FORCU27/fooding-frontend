- https://github.com/vercel/turborepo/blob/main/examples/basic/turbo.json

```
yarn turbo run
```

패키지 추가

```
yarn workspaces foreach --all --include '*-front' add -D husky

yarn workspace back-office-front add -D vitest && \
yarn workspace customer-front add -D vitest && \
yarn workspace landing-front add -D vitest

npx yarn workspaces foreach --filter './apps/*' add <package-name>
```
