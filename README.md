# Descripción

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del ```.env.example``` y renombrarlo a ```.env``` y cambiar las variables de entorno
3. Instalar dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de Prisma
```
    npx prisma contract emit
    npx prisma db init --advance-ref db
    npx prisma db verify
```
Cuando realizamos un cambio en las migraciones de ahora en adelante, debemos ejecutar:
```
npx prisma contract emit
npx prisma db update
```
6. Correr el proyecto ```npm run dev```

## Correr en prod