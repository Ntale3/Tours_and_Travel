FROM node:24.6.0-alpine
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /tours
COPY package*.json ./
RUN npm install
COPY . .
ENV API_URL=http://localhost:8000
EXPOSE 3000
CMD ["npm", "run","dev"]