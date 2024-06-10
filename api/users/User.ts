import {Model, Table, Column, HasMany, DataType} from 'sequelize-typescript';

import {Post} from '../posts/Post';

@Table
export class User extends Model {

    @Column({ type: DataType.STRING })
    name!: string;

    @Column({ type: DataType.STRING })
    email: string;

    @Column({ type: DataType.STRING })
    password: string

    @HasMany(() => Post)
    posts: Post[];

}