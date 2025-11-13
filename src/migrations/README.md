# Migraciones

Esta carpeta contendrá las migraciones de base de datos generadas automáticamente por TypeORM.

## Generar una migración

```bash
npm run migration:generate -- src/migrations/NombreMigracion
```

## Ejecutar migraciones

```bash
npm run migration:run
```

## Revertir última migración

```bash
npm run migration:revert
```

**Nota:** Las migraciones se generan automáticamente basándose en los cambios en las entidades.

