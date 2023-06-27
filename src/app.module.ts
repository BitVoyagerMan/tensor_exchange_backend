import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { CatsModule } from './cat/cats.module';
import { UsersModule } from './auth/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {config} from 'dotenv'
config()

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: "root",
      password: 'Password123#@!',
      database: 'tensorchange',
      autoLoadModels: true,
      synchronize: false,
      define: {
        timestamps: false,
      },
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    }),
    CatsModule,
    UsersModule,

  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
