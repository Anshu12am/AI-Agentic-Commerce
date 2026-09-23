# ---------- Frontend Build ----------

FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

COPY Frontend/vite-project/package*.json ./

RUN npm install

COPY Frontend/vite-project/ .

RUN npm run build


# ---------- Backend ----------

FROM node:20-alpine

WORKDIR /app

COPY Backend/package*.json ./Backend/

RUN cd Backend && npm install --omit=dev

COPY Backend/ ./Backend/

COPY --from=frontend-build /app/frontend/dist ./Frontend/vite-project/dist

EXPOSE 3000

CMD ["node", "Backend/server.js"]