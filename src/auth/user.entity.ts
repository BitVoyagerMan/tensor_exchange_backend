import { Field, ID, ObjectType } from '@nestjs/graphql';
import { JSONB } from 'sequelize';

import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType} from 'sequelize-typescript';
import { Col, Json } from 'sequelize/types/utils';


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

    @Column(DataType.JSON)
    roles: JSON

    
    @Column
    password: string;

    @Column
    email:string;

    @Field()
    @Column
    is_verified: number;
}