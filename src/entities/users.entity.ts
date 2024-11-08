import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid"
import { Posts } from "./posts.entity";

@Entity("")
export class Users {
  @PrimaryColumn('uuid')
  readonly id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column("text")
  password!: string;

  @Column("text", {unique: true})
  email!: string;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @Column({ type: "boolean", default: false })
  is_adm!: boolean;

  @Column({ type: "boolean", default: false })
  is_faq!: boolean;

  @Column({ type: "boolean", default: false })
  is_post!: boolean;

  @Column({ type: "boolean", default: false })
  is_user!: boolean;

  @Column({ type: "boolean", default: false })
  is_product!: boolean;

  @OneToMany(() => Posts, (posts) => posts.users)
  posts?: Posts;

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

