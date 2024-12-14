FROM node:21.7.3-alpine3.19 as builder

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package.json package-lock.json ./

RUN npm install
RUN npm i -g vite

# Copy essential project files
COPY tsconfig.json .
COPY vite.config.ts .
COPY postcss.config.cjs .
COPY tailwind.config.ts .
COPY index.html .
COPY public/ ./public/
COPY src/ ./src/
COPY tsconfig.app.json .
COPY tsconfig.node.json .

# Build the application
RUN npm run build

# Runner stage
FROM node:21.7.3-alpine3.19 as runner

WORKDIR /usr/src/app

# Copy built files
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json .

RUN npm install --production

ENV PORT=4173
EXPOSE 4173

CMD ["npm", "run", "serve"]