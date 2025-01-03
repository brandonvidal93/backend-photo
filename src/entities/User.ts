import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn()
  documentID!: string; // *
  
  @Column()
  documentType!: string; // *

  @Column()
  firstName!: string; // *

  @Column()
  middleName!: string;

  @Column()
  lastName!: string; // *

  @Column()
  secondLastName!: string;

  @Column()
  birthDate!: string;

  @Column()
  phone!: string;

  @Column()
  email!: string; // *
}