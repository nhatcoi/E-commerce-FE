FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Force rebuild esbuild binary to match Docker env
RUN npm rebuild esbuild

COPY . .

ARG VITE_API_URL
ARG VITE_RECAPTCHA_SITE_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]