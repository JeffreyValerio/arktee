# Descripcion
Aplicación desarrollada con **Next.js** para la plataforma web de Arktee.

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y configurar las variables de entorno:
   - `DATABASE_URL`: URL de conexión a PostgreSQL (Railway o local)
   - `NEXT_PUBLIC_URL`: URL pública de la aplicación
   - `SESSION_SECRET`: Clave secreta para sesiones
   - Variables de Cloudinary (si aplica)
3. Instalar dependencias ```npm install```
4. Generar cliente de Prisma ```npx prisma generate```
5. Sincronizar esquema con la base de datos ```npx prisma db push``` (o ```npx prisma migrate dev``` para migraciones)
6. (Opcional) Ejecutar seed para poblar datos de prueba ```npm run seed```
7. Correr el proyecto ```npm run dev```

**Nota**: La aplicación está configurada para usar PostgreSQL en Railway. Para desarrollo local con Docker, usar `docker compose up -d` y actualizar `DATABASE_URL` en el `.env`.

## Correr en prod