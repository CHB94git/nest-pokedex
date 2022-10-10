<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descripción

Project API REST Pokedex with Node, NestJS, Docker and Mongo

# Ejecutar en desarrollo

## Clonar el repositorio

## Installation - node_modules

```bash
With npm:
$ npm install
```

```bash
With yarn:
$ yarn install or yarn
```

## Instalar Nest CLI

```bash
# Global
$ npm i -g nestjs/cli

```

## Levantar la base de datos

```bash
# development
$ docker-compose up -d
```

## Clonar el archivo `.env.template` y renombrar la copia a **.env**

```bash
# development
$ Establecer los valores a las variables de entorno en .env
```

## Reconstruir la información de la BD con el seed(semilla)

```bash
# development
$ BASE_URL = http://localhost:3000
$ {{BASE_URL}}/api/v2/pokemon
```

## Ejecutar la aplicación

```bash
# development
$ npm run start
or
$ yarn start

# watch mode
$ npm run start:dev
or
$ yarn start:dev

# production mode
$ npm run start:prod
or
$ yarn start:prod
```

## Build de producción

# production

1. Crear el archivo **.env.prod**
2. LLenar las variables de entorno de producción
3. Crear la nueva imagen

```bash
 docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

4. Ejecutar solamente imagen

```bash
 docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```
