import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import {Resolver, Query} from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { AppResolver } from './app.resolver';


@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql' }),
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      BlogModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
