# Endpoints API Mitos y Leyendas

## Autenticación

### Registro e Inicio de Sesión
- **POST** `/auth/signup`
  - Descripción: Registrar nuevo usuario
  - Acceso: Público
  - Body: `{ name, email, phone, location, username, password }`
  - Respuesta: Usuario creado + credenciales

- **POST** `/auth/signin`
  - Descripción: Iniciar sesión
  - Acceso: Público
  - Body: `{ username, password }`
  - Respuesta: Token JWT

- **GET** `/auth/profile`
  - Descripción: Obtener perfil del usuario autenticado
  - Acceso: Requiere token JWT
  - Respuesta: Datos del usuario


## Usuarios

### CRUD Usuarios
- **GET** `/users`
  - Descripción: Listar todos los usuarios
  - Acceso: Admin
  - Respuesta: Array de usuarios

- **GET** `/users/:uuid`
  - Descripción: Obtener usuario por UUID
  - Acceso: Admin o usuario autenticado (su propio perfil)
  - Respuesta: Datos del usuario

- **PUT** `/users/:uuid`
  - Descripción: Actualizar usuario
  - Acceso: Admin o usuario autenticado (su propio perfil)
  - Body: `{ name, email, phone, location }`
  - Respuesta: Usuario actualizado

- **DELETE** `/users/:uuid`
  - Descripción: Desactivar usuario (soft delete)
  - Acceso: Admin
  - Respuesta: Confirmación


## Favoritos

- **GET** `/users/:uuid/favorites`
  - Descripción: Obtener leyendas favoritas del usuario
  - Acceso: Usuario autenticado (su propio perfil) o Admin
  - Respuesta: Array de leyendas favoritas

- **POST** `/users/:uuid/favorites/:legendId`
  - Descripción: Agregar leyenda a favoritos
  - Acceso: Usuario autenticado (su propio perfil)
  - Respuesta: Confirmación

- **DELETE** `/users/:uuid/favorites/:legendId`
  - Descripción: Eliminar leyenda de favoritos
  - Acceso: Usuario autenticado (su propio perfil)
  - Respuesta: Confirmación


## Leyendas

### CRUD Leyendas
- **GET** `/legends`
  - Descripción: Listar todas las leyendas activas
  - Acceso: Público
  - Respuesta: Array de leyendas

- **GET** `/legends/legendById/:uuid`
  - Descripción: Obtener leyenda por UUID
  - Acceso: Público
  - Respuesta: Datos completos de la leyenda

- **GET** `/legends/getByTitle/:title`
  - Descripción: Buscar leyenda por título
  - Acceso: Público
  - Respuesta: Leyenda encontrada

- **GET** `/legends/legendByUrl/:url`
  - Descripción: Buscar leyenda por URL de imagen
  - Acceso: Público
  - Respuesta: Leyenda encontrada

- **POST** `/legends/createLegend`
  - Descripción: Crear nueva leyenda
  - Acceso: Admin
  - Body: `{ title, description, story, origin, imageUrl, categoryId, locationId }`
  - Respuesta: Leyenda creada

- **PUT** `/legends/updateLegends`
  - Descripción: Actualizar leyenda
  - Acceso: Admin
  - Body: `{ uuid, title, description, story, origin, imageUrl, categoryId, locationId }`
  - Respuesta: Leyenda actualizada

- **DELETE** `/legends/deleteLegendById/:uuid`
  - Descripción: Desactivar leyenda (soft delete)
  - Acceso: Admin
  - Respuesta: Confirmación


## Categorías

- **GET** `/categories`
  - Descripción: Listar todas las categorías activas
  - Acceso: Público
  - Respuesta: Array de categorías

- **GET** `/categories/:id`
  - Descripción: Obtener categoría por ID
  - Acceso: Público
  - Respuesta: Datos de la categoría

- **POST** `/categories`
  - Descripción: Crear nueva categoría
  - Acceso: Admin
  - Body: `{ name, description }`
  - Respuesta: Categoría creada

- **PUT** `/categories/:id`
  - Descripción: Actualizar categoría
  - Acceso: Admin
  - Body: `{ name, description }`
  - Respuesta: Categoría actualizada

- **DELETE** `/categories/:id`
  - Descripción: Desactivar categoría (soft delete)
  - Acceso: Admin
  - Respuesta: Confirmación


## Ubicaciones

- **GET** `/locations`
  - Descripción: Listar todas las ubicaciones activas
  - Acceso: Público
  - Respuesta: Array de ubicaciones

- **GET** `/locations/:id`
  - Descripción: Obtener ubicación por ID
  - Acceso: Público
  - Respuesta: Datos de la ubicación

- **GET** `/locations/:id/legends`
  - Descripción: Obtener todas las leyendas de una ubicación
  - Acceso: Público
  - Respuesta: Array de leyendas

- **POST** `/locations`
  - Descripción: Crear nueva ubicación
  - Acceso: Admin
  - Body: `{ name, department, touristInfo }`
  - Respuesta: Ubicación creada

- **PUT** `/locations/:id`
  - Descripción: Actualizar ubicación
  - Acceso: Admin
  - Body: `{ name, department, touristInfo }`
  - Respuesta: Ubicación actualizada

- **DELETE** `/locations/:id`
  - Descripción: Desactivar ubicación (soft delete)
  - Acceso: Admin
  - Respuesta: Confirmación


## Seed (Datos Iniciales)

- **GET** `/seed`
  - Descripción: Cargar datos iniciales en la base de datos
  - Acceso: Desarrollo únicamente
  - Respuesta: Confirmación de carga


## Roles y Permisos

- **Público**: Endpoints de lectura (GET) de leyendas, categorías y ubicaciones
- **Usuario autenticado**: Gestión de favoritos y perfil propio
- **Admin**: CRUD completo de todas las entidades

