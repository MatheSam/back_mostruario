
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuid } from "uuid"
import { Permissions } from "./permissions.entity";
import { Users } from "./users.entity";

@Entity()
export class Roles {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({ length: 100 })
  name!: string;

  @ManyToMany(() => Permissions, (permission) => permission.roles, {
    cascade: true,
    eager: true
  })
  @JoinTable()
  permissions?: Permissions[];

  @OneToMany(() => Users, (user) => user.roles)
  user!: Users[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
