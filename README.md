# Descripción

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del `.env.example` y renombrarlo a `.env` y cambiar las variables de entorno
3. Instalar dependencias `npm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma

```
    npx prisma contract emit
    npx prisma db init --advance-ref db
    npx prisma db verify
```

Para guardar un cambio del contrato como una migración y aplicarlo a la base de datos, ejecuta:

```
npx prisma contract emit
npx prisma migration plan --name nombre-del-cambio
npx prisma migration status
npx prisma db migrate --show
npx prisma db migrate
```


`migration plan` genera el paquete de migración; `db migrate` aplica las migraciones pendientes. `db update` también existe, pero actualiza directamente el esquema de la base de datos y no sustituye este flujo cuando se quiere guardar una migración. No reinicies la base de datos para agregar una columna. Si la columna es obligatoria y no tiene valor por defecto, define cómo se rellenarán las filas existentes antes de aplicar el cambio. 

6. Ejecutar seed `npm run seed` 
7. Correr el proyecto `npm run dev`

## Correr en prod
