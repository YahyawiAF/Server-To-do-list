import {
  Entity,
  ObjectID,
  Column,
  BaseEntity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Field()
  @Column("text")
  email: string;

  @Field()
  @Column("text")
  password: string;

  // @OneToMany(() => ToDo, (todo: ToDo) => todo.user, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // })
  // todos: Promise<ToDo[]>;
}
