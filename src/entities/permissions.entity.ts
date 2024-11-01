
import { Entity, Column, PrimaryColumn, ManyToMany } from "typeorm";
import { v4 as uuid } from "uuid"
import { Roles } from "./role.entity";

@Entity()
export class Permissions {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({length: 100})
  name!: string;

  @ManyToMany(() => Roles, (role) => role.permissions)
  roles?: Roles[];
  
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
