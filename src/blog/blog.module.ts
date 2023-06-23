import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Blog } from './blog.entity';
import { BlogResolver } from './blog.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [BlogService, BlogResolver]
})
export class BlogModule {}
