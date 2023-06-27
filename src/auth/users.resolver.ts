import {
    Resolver,
    Query,
    Mutation,
    Args,
  } from '@nestjs/graphql';
import { UserInput } from './dao/user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { SigninArgs } from './dao/signin.args';
import { AuthToken } from './dao/signin.args';
@Resolver()
export class UsersResolver {
    constructor(private readonly userService: UsersService) {}

    @Query(() => String)
    sayHelloCats(): string {
        return 'This cat category for test.';
    }
    @Query(() => [User])
    users(): Promise < User[] > {
        return this.userService.findAll();
    }

    @Mutation(() => User)
    async signin(@Args('signinArgs') signinArgs: SigninArgs):Promise<AuthToken>{
        const token = await this.userService.signin(signinArgs)
        console.log(token)
        return token
    }

    @Mutation(() => User)
    signup(@Args('data') data: UserInput): Promise < User > {
        
        return this.userService.signUp(data)
    }
}