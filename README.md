# API Mitos y Leyendas - Raíces Ancestrales

![Logo Raíces Ancestrales](Docs/logo.png)

## Descripción
API REST para preservar y difundir mitos, leyendas e historias locales de diferentes regiones de Colombia, promoviendo el turismo cultural. Permite a los usuarios explorar leyendas por categoría, región, y guardar sus favoritas.

## Integrantes
- Caro
- Taty
- Yuri
- Isa Y.
- Isa E.

## Modelo Entidad-Relación (MER)

![MER - Raíces Ancestrales](Docs/MER.png)

## Tecnologías
- **Backend:** NestJS, TypeORM
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT (JSON Web Tokens)
- **Documentación:** Swagger
- **Testing:** Jest

## Instalación Local

### Prerrequisitos
- Node.js 18+ 
- PostgreSQL 14+
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/raices.git
cd raices
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar PostgreSQL
```bash
# Crear base de datos
psql -U postgres
CREATE DATABASE mitos_db;
\q
```

4. Configurar variables de entorno

Crear archivo `.env.development` en la raíz del proyecto:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=mitos_db
JWT_SECRET=secret_key_segura
```

5. Iniciar servidor en modo desarrollo
```bash
npm run start:dev
```

6. Cargar datos iniciales

Visitar: `http://localhost:3000/seed`

Esto creará:
- 5 categorías
- 10 ubicaciones
- 18 leyendas
- 1 usuario administrador

### Credenciales de Prueba

**Administrador:**
- Username: `admin`
- Password: `admin123`

## Scripts Disponibles

```bash
npm run start:dev    # Modo desarrollo con hot-reload
npm run start:prod   # Modo producción
npm run build        # Compilar proyecto
npm run test         # Ejecutar pruebas unitarias
npm run test:cov     # Pruebas con coverage
```

## Documentación API

Una vez el servidor esté corriendo, acceder a:
- Swagger UI: `http://localhost:3000/api`
- JSON Schema: `http://localhost:3000/api-json`

## Estructura del Proyecto
```
src/
├── auth/           # Autenticación y autorización
├── users/          # Gestión de usuarios
├── credentials/    # Credenciales (username/password)
├── legends/        # CRUD de leyendas
├── categories/     # Categorías de leyendas
├── locations/      # Ubicaciones turísticas
├── seed/           # Datos iniciales
├── entities/       # Entidades TypeORM
├── enums/          # Enumeraciones (roles)
├── config/         # Configuración de TypeORM
└── main.ts         # Entry point
```

## Endpoints Principales

### Públicos (sin autenticación)
- `GET /categories` - Listar categorías
- `GET /locations` - Listar ubicaciones
- `GET /legends` - Listar leyendas
- `GET /legends/legendById/:uuid` - Obtener leyenda por ID
- `GET /locations/:id/legends` - Leyendas por ubicación

### Autenticación
- `POST /auth/signin` - Login (obtener token JWT)
- `POST /auth/signup` - Registro de usuario
- `GET /auth/profile` - Perfil del usuario autenticado

### Protegidos (requieren token + rol ADMIN)
- `POST /legends/createLegend` - Crear leyenda
- `PUT /legends/updateLegends` - Actualizar leyenda
- `DELETE /legends/deleteLegendById/:uuid` - Eliminar leyenda (soft delete)

Para la documentación completa con ejemplos de request/response, consulta:
- [Swagger UI](http://localhost:3000/api)
- [Documentación de endpoints](Docs/ENDPOINTS.md)

## Roles y Permisos

- **USER**: Puede ver leyendas, categorías, ubicaciones y gestionar favoritos
- **ADMIN**: Acceso completo incluyendo crear, editar y eliminar leyendas
