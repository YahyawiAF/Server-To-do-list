import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class ToDo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Field()
  @Column()
  Title: string;

  @Field()
  @Column()
  Description: string;

  @Field({ nullable: true })
  @Column()
  Creator: string;

  @Field(() => Boolean, { nullable: true })
  @Column()
  IsCompleted: boolean;
}
