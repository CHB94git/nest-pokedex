import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

import { CommonModule } from './common/common.module';
import { envConfiguration } from './config/env.config';
import { JoiValidationEnvSchema } from './config/joi-validation-env';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      validationSchema: JoiValidationEnvSchema,
      isGlobal: true,
      // Custom env file path
      // envFilePath: `config/${process.env.NODE_ENV}.env`,
    }),
    // Servir contenido estático
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    // Conectar mongoDB
    MongooseModule.forRoot(process.env.MONGO_DB),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
