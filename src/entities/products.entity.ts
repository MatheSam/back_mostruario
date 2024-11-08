import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid"
import { SubCategories } from "./subCategorie.entity";
import { Marcas } from "./marcas.entity";
import { Gender } from "./gender.entity";
import { Products_variations } from "./products_variations.entity";



@Entity("") // Nome da tabela no banco
export class Products {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({ length: 100/* , unique: true */ })
  title!: string;

  @Column({ length: 100 })
  url!: string;

  @Column()
  short_descr!: string;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  price!: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  promotion!: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  a_vista!: number;

  @Column()
  juros!: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  parcelado!: number;

  @Column({ type: "integer" })
  qtde_parcelado!: number;

  @Column()
  caracteristicas!: string;

  @Column()
  descr!: string;

  @ManyToOne(() => SubCategories, (subcategory) => subcategory.products, { nullable: false })
  subcategory?: SubCategories;

  @ManyToOne(() => Marcas)
  marca?: Marcas;

  @ManyToOne(() => Gender)
  gender!: Gender;

  @OneToMany(() => Products_variations, (variations) => variations.product, {eager: true})
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