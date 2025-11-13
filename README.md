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

## Pasos

WIP


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