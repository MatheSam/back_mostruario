import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("")
export class Marcas {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({ length: 100, unique: true })
  title!: string;

  @Column({ length: 100, unique: true })
  url!: string;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}