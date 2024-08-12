# Evaluación de Desempeño - Sistema de Gestión

## Descripción

Este proyecto es un sistema de gestión de evaluaciones de desempeño, diseñado para ayudar a las organizaciones a evaluar el rendimiento de sus empleados. El sistema permite la creación, administración y evaluación de preguntas y respuestas, así como la generación de reportes para usuarios y departamentos.

## Características

- **Gestión de Usuarios**: Administración de usuarios con diferentes roles (Administrador, Manager, Empleado).
- **Evaluaciones**: Creación y gestión de evaluaciones de desempeño para empleados.
- **Preguntas y Respuestas**: Creación de preguntas para evaluaciones, con la posibilidad de responder y calificar dichas preguntas.
- **Asignación de Evaluadores**: Asignación automática de evaluadores (managers) a las evaluaciones, según la carga de trabajo.
- **Reportes**: Generación de reportes para usuarios y departamentos.

## Tecnologías Utilizadas

- **Node.js**
- **Express**
- **MongoDB** con **Mongoose**
- **TypeScript**
- **Nodemailer** para el envío de correos electrónicos
- **Jest** para pruebas unitarias
- **Swagger** para la documentación de la API

## Arquitectura del Proyecto

El proyecto está diseñado utilizando **Domain-Driven Design (DDD)**, con el objetivo de reflejar con precisión el dominio del negocio.

### ¿Por qué DDD?

1. **Focalización en el Dominio**: DDD permite que el software esté alineado con las reglas de negocio y la lógica del dominio, facilitando que los desarrolladores y los expertos en negocio hablen el mismo idioma.
2. **Modularidad y Mantenibilidad**: La separación clara de las responsabilidades en diferentes capas hace que el código sea más fácil de mantener, probar y extender.
3. **Escalabilidad**: DDD ayuda a diseñar sistemas escalables al encapsular la lógica del dominio dentro de entidades ricas y objetos de valor, y al definir interfaces claras para la infraestructura.


## Estructura del Proyecto

```bash
├── src
│   ├── common
│   │   ├── utility.ts
│   │   ├── server.ts
│   │   └── infrastructure
│   │       └── schema-validator.ts
│   │       └── ...
│   ├── config
│   │   ├── emv.config.ts
│   │   ├── mail.config.ts
│   │   ├── mongodb.config.ts
│   │   ├── swagger.config.ts
│   ├── modules
│   │   ├── auth
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   ├── infrastructure
│   │   ├── evaluations
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   ├── infrastructure
│   │   ├── questions
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   ├── infrastructure
│   │   ├── reports
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   ├── infrastructure
│   │   └── users
│   │       ├── application
│   │       ├── domain
│   │       ├── infrastructure
│   └── index.ts
├── __tests__
├── .env.example
├── .gitignore
├── jest.config.ts
├── package.json
└── tsconfig.json
```

## Configuración del Entorno

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/qvacode/employee.git
   cd tu-repositorio
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Compila el proyecto (opcional para TypeScript):
   ```bash
   npm run build
   ```

## Ejecución del Proyecto

### Desarrollo

Para ejecutar el proyecto en modo desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Esto levantará el servidor en modo desarrollo, utilizando `nodemon` para recargar automáticamente cuando se detecten cambios en el código.

### Producción

Para ejecutar el proyecto en modo producción ejecuta:

```bash
npm start
```

### Pruebas

Ejecuta las pruebas unitarias utilizando `Jest`:

```bash
npm test
```

### Documentación de la API

La documentación de la API está disponible en Swagger. Una vez que el servidor esté en funcionamiento, visita:

```
http://localhost:3000/api/v1/doc
```

