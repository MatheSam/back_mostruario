import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid"
import { Categories } from "./categories.entity";
import { Products } from "./products.entity";

@Entity("") // Nome da tabela no banco
export class SubCategories {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({ length: 100 })
  title!: string;

  @Column({ length: 100 })
  url!: string;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @ManyToOne(() => Categories, (category) => category.subcategories, {nullable: false})
  category?: Categories;

  @OneToMany(() => Products, (products) => products.subcategory)
  products?: Products[];

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