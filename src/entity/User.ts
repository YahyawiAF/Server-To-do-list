import { Entity, ObjectID, Column, BaseEntity, ObjectIdColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

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
}
