import { Alumno } from "../Alumnos/models/alumno.model";

// Alumno de prueba 1 - Datos completos
export const alumnoTest1: Alumno = new Alumno({
  general: {
    id: 1,
    nombre: 'María González López',
    matricula: 'A12345678',
    telefono: '5512345678',
    correo: 'maria.gonzalez@example.com',
    carrera: 'TIADSM',
    CURP: 'GOLM800101HDFLPR01',
    ciudad: 'Ciudad de México',
    domicilio: 'Calle Falsa 123, Col. Centro',
    edad: 23
  },
  medical: {
    NSS: '12345678901',
    Afiliacion: 'IMSS',
    RH: 'A+',
    Donador: 'Sí',
    Peso: '65 kg',
    Talla: '1.70 m',
    Alergias: 'Penicilina, polen',
    Enfermedades: 'Asma',
    Tratamientos: 'Salbutamol cuando sea necesario',
    discapacidad: 'Ninguna',
    EnCasoDeAccidente: 'Llamar a Juan Pérez (55 9876 5432)'
  }
});

// Alumno de prueba 2 - Datos mínimos
export const alumnoTest2: Alumno = new Alumno({
  general: {
    id: 2,
    nombre: 'Carlos Sánchez Ruiz',
    matricula: 'B87654321',
    correo: 'carlos.sanchez@example.com',
    CURP: 'SARL900202HDFLPR02',
    ciudad: 'Guadalajara',
    domicilio: 'Av. Siempre Viva 456',
    carrera: 'TIADSM',
    edad: 21
  },
  medical: {
    RH: 'O+',
    Donador: 'No',
    Peso: '70 kg',
    Talla: '1.75 m',
    Alergias: 'Ninguna',
     EnCasoDeAccidente: 'Llamar a Ana Sánchez (33 1234 5678)'
  }});