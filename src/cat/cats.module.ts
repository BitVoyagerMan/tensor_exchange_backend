import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { catsProviders } from './cats.providers';
import { CatsResolver } from './cats.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from './cat.entity';

@Module({
  imports: [SequelizeModule.forFeature([Cat])],
  providers: [
    CatsService,
    CatsResolver
  ],
})
export class CatsModule {}