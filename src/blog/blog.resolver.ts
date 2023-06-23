import { Blog } from './blog.entity';
import { BlogService } from './blog.service';
import { BlogInput } from './dto/create-blog.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver((of) => Blog)
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query((type) => [Blog])
  async getAllBlogs() {
    return this.blogService.getAll();
  }

  @Mutation((returns) => Blog)
  createBlog(@Args('blogInput') blogInput: BlogInput): Promise<Blog> {
    return this.blogService.createBlog(blogInput);
  }
}