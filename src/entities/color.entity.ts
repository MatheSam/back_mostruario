import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid"
import { Products_variations } from "./products_variations.entity";

@Entity("") // Nome da tabela no banco
export class Colors {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({ length: 100, unique: true })
  title!: string;

  @Column({ length: 100, unique: true })
  hexadecimal!: string;

  @OneToMany(() => Products_variations, (variations) => variations.colors)
  variations!: Products_variations[];

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