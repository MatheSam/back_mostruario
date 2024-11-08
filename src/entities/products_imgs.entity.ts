import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid"
import { Colors } from "./color.entity";
import { Products_variations } from "./products_variations.entity";
import { Imgs } from "./imgs.entity";

@Entity("") // Nome da tabela no banco
export class Products_imgs {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @OneToMany(() => Products_variations, (variations) => variations.product_imgs)
  variations!: Products_variations[];

  @OneToMany(() => Imgs, (img) => img.product_imgs, {eager: true})
  imgs!: Imgs[];

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