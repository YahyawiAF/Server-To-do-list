import { Entity, ObjectID, ObjectIdColumn, Column, BaseEntity } from "typeorm";

@Entity("users")
export class ToDo extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  Title: string;

  @Column()
  Description: string;
}
