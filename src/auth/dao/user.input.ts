import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ nullable: false })
  username: string;
  @Field({nullable:false})
  password: string;
  @Field({ nullable: false })
  email: string;
  @Field({nullable: false})
  is_verified: boolean;
  
}
