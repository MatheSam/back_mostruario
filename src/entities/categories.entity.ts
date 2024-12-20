import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid"
import { SubCategories } from "./subCategorie.entity";
import { urlNormalized } from "../utils/functions";

@Entity("")
export class Categories {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({ length: 100 })
  title!: string;

  @Column({ length: 150, nullable: true})
  url!: string;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @OneToMany(() => SubCategories, (subcategory) => subcategory.category)
  subcategories!: SubCategories[];

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