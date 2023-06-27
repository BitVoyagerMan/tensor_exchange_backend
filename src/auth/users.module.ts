import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
        secret:"bitvoyager",
        signOptions:{expiresIn:'36000s'},
    })
    ],
  providers: [
    UsersService,
    UsersResolver,
  ],
})
export class UsersModule {}