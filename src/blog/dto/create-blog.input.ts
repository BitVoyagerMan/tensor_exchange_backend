//create-blog.input.ts
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BlogInput {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  author: string;

  @Field()
  date: string;
}