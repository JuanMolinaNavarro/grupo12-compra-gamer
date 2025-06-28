# Sistema de Autenticación - Compra Gamer Clone

## Descripción
Sistema de inicio de sesión implementado con React, Zustand, Express y MySQL.

## Funcionalidades Implementadas

### Backend (Puerto 8000)
- **POST /auth/login** - Iniciar sesión
- **POST /auth/register** - Registrar nuevo usuario  
- **POST /auth/logout** - Cerrar sesión

### Frontend
- **AuthModal** - Modal para login/registro
- **authStore** - Store de Zustand para manejo de estado
- **Header** - Muestra información del usuario logueado

## Estructura de la Base de Datos

La tabla `usuarios` debe tener la siguiente estructura:

```sql
CREATE TABLE Usuarios (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(100),
apellido VARCHAR(100),
email VARCHAR(150) UNIQUE,
contraseña VARCHAR(255),
telefono VARCHAR(20),
fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Cómo usar

### 1. Iniciar el Backend
```bash
cd backend
npm run dev
```

### 2. Iniciar el Frontend
```bash
npm run dev
```

### 3. Probar la Autenticación

#### Registrar un usuario nuevo:
1. Haz clic en "Ingresá" en el header
2. Clic en "Crear Cuenta"
3. Completa los campos requeridos
4. Haz clic en "Registrarse"

#### Iniciar sesión:
1. Haz clic en "Ingresá" en el header
2. Ingresa email y contraseña
3. Haz clic en "Iniciar Sesión"

#### Cerrar sesión:
1. Estando logueado, haz clic en "Cerrar Sesión" en el header

## Estados del Store

El store de Zustand (`authStore`) maneja:
- `usuario`: Datos del usuario logueado
- `isLoggedIn`: Estado de autenticación
- `loading`: Estado de carga
- `error`: Mensajes de error

## Funciones Disponibles

### Store Actions
- `login(email, contraseña)`: Iniciar sesión
- `register(nombre, apellido, email, contraseña, telefono)`: Registrar usuario
- `logout()`: Cerrar sesión
- `clearError()`: Limpiar errores

## Validaciones

### Frontend
- Campos requeridos en formularios
- Verificación de contraseñas coincidentes en registro
- Manejo de errores con alertas

### Backend
- Validación de datos requeridos
- Verificación de email único
- Respuestas consistentes con success/error

## Notas Importantes

- No usa encriptación de contraseñas (como solicitado)
- No usa JWT o tokens complejos
- Código simple para nivel principiante
- No modifica estilos CSS existentes

## Archivos Modificados/Creados

### Backend
- `controllers/auth.js` - Controlador de autenticación
- `routes/auth.js` - Rutas de autenticación  
- `index.js` - Agregadas rutas de auth

### Frontend
- `stores/authStore.js` - Store de Zustand
- `components/Auth/AuthModal.jsx` - Modal actualizado
- `components/Header/Header.jsx` - Header actualizado

## Ejemplos de Uso

### En el componente:
```jsx
import useAuthStore from '../stores/authStore';

const MiComponente = () => {
  const { usuario, isLoggedIn, login, logout } = useAuthStore();
  
  if (isLoggedIn) {
    return <div>Hola {usuario.nombre}!</div>;
  }
  
  return <div>No estás logueado</div>;
};
```

### Para llamar las funciones:
```javascript
// Login
const result = await login('email@test.com', 'password');
if (result.success) {
  console.log('Login exitoso');
}

// Registro
const result = await register('Juan', 'Pérez', 'juan@test.com', 'password', '123456789');
```
