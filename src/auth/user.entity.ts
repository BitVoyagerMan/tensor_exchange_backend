import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType} from 'sequelize-typescript';
import { Role } from 'src/model/role.enum';



@Table({tableName:'user'})
@ObjectType({description:'auth'})
export class User extends Model {
    @Field(()=>ID)
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Field()
    @Column
    username: string;

    @Column
    roles:string;

    
    
    @Column
    password: string;
    
    @Field()
    @Column
    email:string;

    @Field()
    @Column
    is_verified: number;

    // @Field()
    // token:string;
}