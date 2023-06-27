import { Field, ObjectType } from '@nestjs/graphql';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
@ObjectType({ description: 'cat ' })
export class Cat extends Model {
  @Field()
  @Column
  name: string;
  @Field()
  @Column
  age: number;
  
  @Column
  breed: string;
}