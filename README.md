# Descripción

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del `.env.example` y renombrarlo a `.env` y cambiar las variables de entorno
3. Instalar dependencias `npm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma

Si es la primera vez que se va a realizar una migración, se deben correr estos comandos:

```
    npx prisma contract emit
    npx prisma db init --advance-ref db
    npx prisma db verify
```

Para guardar un cambio del contrato como una migración y aplicarlo a la base de datos, ejecuta:

```
npx prisma contract emit
npx prisma migration plan --name mi_cambio
npx prisma migration list
npx prisma migration show <nombre_del_bundle>
npx prisma db migrate
npx prisma migration status
```

#### Los comandos que si o si debes ejecutar al realizar cambios:

`npx prisma contract emit` (actualiza TypeScript local)

`npx prisma migration plan --name mi_cambio`

`npx prisma db migrate ` (impacta la base de datos real)

6. Ejecutar seed `npm run seed`
7. Correr el proyecto `npm run dev`

## Correr en prod
