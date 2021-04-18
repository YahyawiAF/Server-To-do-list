import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class ToDo {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  Title: string;

  @Column()
  Description: string;
}
