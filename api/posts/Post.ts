import {Model, Table, Column, ForeignKey, BelongsTo, DataType} from 'sequelize-typescript';

import {User} from "../users/User";

@Table
export class Post extends Model {

    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.STRING })
    description: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId!: number;

    @BelongsTo(() => User)
    user: User;

}