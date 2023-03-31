# Production image, copy all the files and run next
FROM node:18-alpine
WORKDIR /app

COPY . .

RUN yarn global add pnpm && pnpm i

RUN pnpm build

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY ./cert/DigiCertGlobalRootCA.crt.pem /app/cert/DigiCertGlobalRootCA.crt.pem

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["pnpm", "start"]