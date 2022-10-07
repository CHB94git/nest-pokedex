<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descripción
Project API REST Pokedex with Node, NestJS, Docker and Mongo

# Ejecutar en desarrollo

## Clonar el repositorio

## Installation - node_modules

```bash
$ npm install
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

## Reconstruir la información de la BD con el seed(semilla)

```bash
# development
$ {{BASE_URL}}/api/v2/pokemon
$ BASE_URL = http://localhost:3000
```

## Ejecutar la aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

