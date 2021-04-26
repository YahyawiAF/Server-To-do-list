import {
  Entity,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
  Column,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  comment: string;

  @Field()
  @Column()
  likes: number;

  @Field()
  @Column()
  creator: string;

  constructor(comment: string, creator: string) {
    this.comment = comment;
    this.creator = creator;
  }
}
