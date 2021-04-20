import {
  Entity,
  ObjectID,
  Column,
  BaseEntity,
  ObjectIdColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { ToDo } from "./ToDo";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column("text")
  email: string;

  @Field()
  @Column("text")
  password: string;

  @OneToMany(() => ToDo, (todo: ToDo) => todo.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  todos: Array<ToDo>;
}
