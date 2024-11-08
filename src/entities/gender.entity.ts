import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("") // Nome da tabela no banco
export class Gender {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({ length: 20, unique: true })
  title!: string;

  @Column({unique: true, length: 1})
  sigla!: string;
  
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