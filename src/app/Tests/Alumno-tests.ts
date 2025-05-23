// alumno-test.data.ts

import { Alumno } from "../core/Models/alumno.model";


// Alumno de prueba 1 - Datos completos
export const alumnoTest1: Alumno = new Alumno(
  1,
  'María González López',
  'A12345678',
  '5512345678',
  'maria.gonzalez@example.com',
  'GOLM800101HDFLPR01',
  'Ciudad de México',
  'Calle Falsa 123, Col. Centro',
  23,
  '12345678901',
  'IMSS',
  'A+',
  'Sí',
  '65 kg',
  '1.70 m',
  'Penicilina, polen',
  'Asma',
  'Salbutamol cuando sea necesario',
  'Ninguna',
  'Llamar a Juan Pérez (55 9876 5432)'
);

// Alumno de prueba 2 - Datos mínimos
export const alumnoTest2: Alumno = new Alumno(
  2,
  'Carlos Sánchez Ruiz',
  'B87654321',
  '',
  'carlos.sanchez@example.com',
  'SARL900202HDFLPR02',
  'Guadalajara',
  'Av. Siempre Viva 456',
  21,
  '',
  '',
  'O+',
  'No',
  '70 kg',
  '1.75 m',
  'Ninguna',
  '',
  '',
  '',
  'Llamar a Ana Sánchez (33 1234 5678)'
);