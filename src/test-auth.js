// Archivo de prueba para verificar el sistema de autenticación
// Este archivo es solo para pruebas, puedes eliminarlo después

import axios from 'axios';

// Función para probar el login
const testLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8000/auth/login', {
      email: 'test@test.com',
      contraseña: '123456'
    });
    console.log('Login exitoso:', response.data);
  } catch (error) {
    console.log('Error en login:', error.response?.data?.message);
  }
};

// Función para probar el registro
const testRegister = async () => {
  try {
    const response = await axios.post('http://localhost:8000/auth/register', {
      nombre: 'Juan',
      apellido: 'Pérez', 
      email: 'juan@test.com',
      contraseña: '123456',
      telefono: '1234567890'
    });
    console.log('Registro exitoso:', response.data);
  } catch (error) {
    console.log('Error en registro:', error.response?.data?.message);
  }
};

// Exportar las funciones para usar en la consola del navegador
window.testLogin = testLogin;
window.testRegister = testRegister;

console.log('Funciones de prueba cargadas. Usa testLogin() y testRegister() en la consola del navegador.');
