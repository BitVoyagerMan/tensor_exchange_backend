import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import config from './sequalize.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatsModule } from './cat/cats.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql' }),
      CatsModule
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
