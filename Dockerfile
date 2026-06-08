FROM node:22-slim AS frontend-build

WORKDIR /app/views

COPY views/package.json views/package-lock.json ./
RUN npm ci

COPY views/ ./
RUN npm run build

FROM node:22-slim AS production

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY app.js ./
COPY controllers ./controllers
COPY middleware ./middleware
COPY models ./models
COPY routes ./routes
COPY utils ./utils
COPY --from=frontend-build /app/views/dist ./views/dist

EXPOSE 8080

USER node

CMD ["npm", "start"]
