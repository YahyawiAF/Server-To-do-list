import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity("todos")
export class ToDo extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  Title: string;

  @Field()
  @Column()
  Description: string;

  @ManyToOne(() => User, (user: User) => user.todos)
  @JoinColumn({ name: "user_email" })
  user: string;
}
