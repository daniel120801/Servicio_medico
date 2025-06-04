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
    edad: 23,
    conferenciasAsistidas: [
      {
        id: 1,
        nombre: 'Conferencia de Tecnología',
        fecha: '2023-10-01',
        hora: '10:00',
        descripcion: 'Una conferencia sobre las últimas tendencias en tecnología.',
        presentador: 'Dr. Juan Pérez'
      },
      {
        id: 2,
        nombre: 'Conferencia de Desarrollo Web',
        fecha: '2023-10-15',
        hora: '11:00',
        descripcion: 'Aprende sobre las mejores prácticas en desarrollo web.',
        presentador: 'Ing. Ana Torres'
      }
    ]
  },
  medical: {
    NSS: '12345678901',
    afiliacion: 'IMSS',
    RH: 'A+',
    donador: 'Sí',
    peso: '65 kg',
    talla: '1.70 m',
    alergias: 'Penicilina, polen',
    enfermedades: 'Asma',
    tratamientos: 'Salbutamol cuando sea necesario',
    discapacidad: 'Ninguna',
    enCasoDeAccidente: 'Llamar a Juan Pérez (55 9876 5432)'
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
    edad: 21,
    telefono: '3312345678'

  },
  medical: {
    RH: 'O+',
    donador: 'No',
    peso: '70 kg',
    talla: '1.75 m',
    alergias: 'Ninguna',
    enCasoDeAccidente: 'Llamar a Ana Sánchez (33 1234 5678)'
  }
});