import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid"
import { Products_imgs } from "./products_imgs.entity";

@Entity("") // Nome da tabela no banco
export class Imgs {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column()
  img?: string;

  @Column({default: false})
  is_main!: boolean;

  @Column({type: "integer", default: 99})
  img_order!: number;

  @ManyToOne(() => Products_imgs, (prod_img) => prod_img.imgs, {nullable: false})
  product_imgs?: Products_imgs;

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