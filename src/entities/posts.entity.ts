import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid"
import { Users } from "./users.entity";

@Entity("") // Nome da tabela no banco
export class Posts {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({ length: 100 })
  title!: string;

  @Column("text")
  descr!: string;

  @ManyToOne(() => Users)
  users!: Users;

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