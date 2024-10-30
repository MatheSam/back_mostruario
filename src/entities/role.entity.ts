
import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity()
export class Roles {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({length: 100})
  name!: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
