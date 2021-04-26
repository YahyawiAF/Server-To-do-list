import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Comments } from "./Comments";

@ObjectType()
@Entity()
export class ToDo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Field({ nullable: true })
  @Column()
  Title: string;

  @Field({ nullable: true })
  @Column()
  Description: string;

  @Field({ nullable: true })
  @Column()
  Creator: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  IsCompleted: boolean;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  @Column({ default: [] })
  shared_by: String[];

  @Field(() => Comments, { nullable: true })
  @Column()
  comment: Comments[];
}
