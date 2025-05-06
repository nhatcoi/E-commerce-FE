FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Force rebuild esbuild binary to match Docker env
RUN npm rebuild esbuild

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]