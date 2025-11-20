FROM node:22-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluye devDependencies para el build)
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación NestJS (compila TypeScript a JavaScript)
RUN npm run build

# Exponer el puerto (Render usará la variable PORT)
EXPOSE 3000

# Comando para producción - ejecuta el código compilado desde dist/
CMD ["npm", "run", "start:prod"]

