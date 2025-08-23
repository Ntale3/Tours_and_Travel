FROM node:24.6.0-alpine

# Create non-root user
RUN addgroup app && adduser -S -G app app

WORKDIR /tours

# Copy package files and set ownership
COPY package*.json ./
RUN chown -R app:app /tours

# Switch to non-root user
USER app

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY --chown=app:app . .

ENV API_URL=http://localhost:8000

EXPOSE 3000

CMD ["npm", "run", "dev"]
