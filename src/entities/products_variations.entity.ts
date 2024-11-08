import { Entity, PrimaryColumn, ManyToOne, Column } from "typeorm";
import { Sizes } from "./size.entity";
import { Colors } from "./color.entity";
import { Products_imgs } from "./products_imgs.entity";
import { Products } from "./products.entity";

@Entity("")
export class Products_variations {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({type: "integer"})
  estoque!: number;

  @ManyToOne(() => Products, (product) => product.variations, {nullable: false})
  product?: Products;

  @ManyToOne(() => Sizes, (size) => size.variations, {nullable: false})
  sizes?: Sizes;

  @ManyToOne(() => Colors, (color) => color.variations, {nullable: true}) // alterar para false
  colors?: Colors;

  @ManyToOne(() => Products_imgs, (imgs) => imgs.variations, {nullable: false})
  product_imgs?: Products_imgs;
}