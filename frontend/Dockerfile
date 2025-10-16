# Étape 1 : base
FROM node:22.18.0-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Étape Dev
FROM base AS dev
EXPOSE 4001
# Commande pour lancer Vite en dev
CMD ["npm", "run", "dev"]

# Étape Build pour prod
FROM base AS build
RUN npm run build

# Étape Prod
FROM node:22.18.0-alpine AS prod
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 4001
CMD ["serve", "-s", "dist", "-l", "4001"]
