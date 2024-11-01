import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid"
import { Posts } from "./posts.entity";
import { Roles } from "./role.entity";

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

  @OneToMany(() => Posts, (posts) => posts.users)
  posts?: Posts;

  @ManyToOne(() => Roles, { eager: false })
  @JoinColumn()
  roles?: Roles;

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

