# Instrucciones para ejecutar el proyecto

## Backend

1. **Navegar al directorio del backend:**
   ```bash
   cd backend
   ```

2. **Instalar dependencias (si no están instaladas):**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo con nodemon:**
   ```bash
   npm run dev
   ```
   
   **O alternativamente:**
   ```bash
   npx nodemon index.js
   ```

4. **Ejecutar en modo producción:**
   ```bash
   npm start
   ```

## Frontend

1. **Desde el directorio raíz del proyecto:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

## URLs de acceso

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **Administración de Productos**: http://localhost:5173/admin
- **Administración de Pagos**: http://localhost:5173/admin/pagos
- **Administración de Marcas**: http://localhost:5173/admin/marcas
- **Administración de Categorías**: http://localhost:5173/admin/categorias

## Solución de problemas

### Si nodemon no funciona:

1. **Instalar nodemon globalmente:**
   ```bash
   npm install -g nodemon
   ```

2. **O usar npx para ejecutarlo sin instalación global:**
   ```bash
   npx nodemon index.js
   ```

3. **O usar el script definido en package.json:**
   ```bash
   npm run dev
   ```

### Si hay problemas con las dependencias:

1. **Eliminar node_modules y reinstalar:**
   ```bash
   rm -rf node_modules
   npm install
   ```

2. **Limpiar cache de npm:**
   ```bash
   npm cache clean --force
   ```
