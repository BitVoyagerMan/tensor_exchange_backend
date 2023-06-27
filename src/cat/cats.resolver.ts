import {
    Resolver,
    Query
  } from '@nestjs/graphql';
import { CatsService } from './cats.service';  
import { Cat } from './cat.entity';

@Resolver()
export class CatsResolver {
    constructor(private readonly catService:CatsService){}
    
    @Query(() => [Cat])
    cats(): Promise<Cat[]> {
        return this.catService.findAll();
}
}
  