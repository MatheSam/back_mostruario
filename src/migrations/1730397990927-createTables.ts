import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1730397990927 implements MigrationInterface {
    name = 'CreateTables1730397990927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar)`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "rolesId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "faq" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar)`);
        await queryRunner.query(`CREATE TABLE "roles_permissions_permissions" ("rolesId" varchar NOT NULL, "permissionsId" varchar NOT NULL, PRIMARY KEY ("rolesId", "permissionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e" ON "roles_permissions_permissions" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6" ON "roles_permissions_permissions" ("permissionsId") `);
        await queryRunner.query(`CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar, CONSTRAINT "FK_da1a6a4fc2bced49477262cfd41" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_posts"("id", "title", "descr", "is_active", "created_at", "updated_at", "usersId") SELECT "id", "title", "descr", "is_active", "created_at", "updated_at", "usersId" FROM "posts"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "rolesId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "FK_30cd0bbcd1dcae7673af7888eb8" FOREIGN KEY ("rolesId") REFERENCES "roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "password", "email", "is_active", "created_at", "updated_at", "rolesId") SELECT "id", "name", "password", "email", "is_active", "created_at", "updated_at", "rolesId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_faq" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar, CONSTRAINT "FK_dfdac2f5f4385de33b03ae472c6" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_faq"("id", "title", "descr", "is_active", "created_at", "updated_at", "usersId") SELECT "id", "title", "descr", "is_active", "created_at", "updated_at", "usersId" FROM "faq"`);
        await queryRunner.query(`DROP TABLE "faq"`);
        await queryRunner.query(`ALTER TABLE "temporary_faq" RENAME TO "faq"`);
        await queryRunner.query(`DROP INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e"`);
        await queryRunner.query(`DROP INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6"`);
        await queryRunner.query(`CREATE TABLE "temporary_roles_permissions_permissions" ("rolesId" varchar NOT NULL, "permissionsId" varchar NOT NULL, CONSTRAINT "FK_dc2b9d46195bb3ed28abbf7c9e3" FOREIGN KEY ("rolesId") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_fd4d5d4c7f7ff16c57549b72c6f" FOREIGN KEY ("permissionsId") REFERENCES "permissions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("rolesId", "permissionsId"))`);
        await queryRunner.query(`INSERT INTO "temporary_roles_permissions_permissions"("rolesId", "permissionsId") SELECT "rolesId", "permissionsId" FROM "roles_permissions_permissions"`);
        await queryRunner.query(`DROP TABLE "roles_permissions_permissions"`);
        await queryRunner.query(`ALTER TABLE "temporary_roles_permissions_permissions" RENAME TO "roles_permissions_permissions"`);
        await queryRunner.query(`CREATE INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e" ON "roles_permissions_permissions" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6" ON "roles_permissions_permissions" ("permissionsId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6"`);
        await queryRunner.query(`DROP INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" RENAME TO "temporary_roles_permissions_permissions"`);
        await queryRunner.query(`CREATE TABLE "roles_permissions_permissions" ("rolesId" varchar NOT NULL, "permissionsId" varchar NOT NULL, PRIMARY KEY ("rolesId", "permissionsId"))`);
        await queryRunner.query(`INSERT INTO "roles_permissions_permissions"("rolesId", "permissionsId") SELECT "rolesId", "permissionsId" FROM "temporary_roles_permissions_permissions"`);
        await queryRunner.query(`DROP TABLE "temporary_roles_permissions_permissions"`);
        await queryRunner.query(`CREATE INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6" ON "roles_permissions_permissions" ("permissionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e" ON "roles_permissions_permissions" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "faq" RENAME TO "temporary_faq"`);
        await queryRunner.query(`CREATE TABLE "faq" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar)`);
        await queryRunner.query(`INSERT INTO "faq"("id", "title", "descr", "is_active", "created_at", "updated_at", "usersId") SELECT "id", "title", "descr", "is_active", "created_at", "updated_at", "usersId" FROM "temporary_faq"`);
        await queryRunner.query(`DROP TABLE "temporary_faq"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "rolesId" varchar, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "password", "email", "is_active", "created_at", "updated_at", "rolesId") SELECT "id", "name", "password", "email", "is_active", "created_at", "updated_at", "rolesId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar)`);
        await queryRunner.query(`INSERT INTO "posts"("id", "title", "descr", "is_active", "created_at", "updated_at", "usersId") SELECT "id", "title", "descr", "is_active", "created_at", "updated_at", "usersId" FROM "temporary_posts"`);
        await queryRunner.query(`DROP TABLE "temporary_posts"`);
        await queryRunner.query(`DROP INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6"`);
        await queryRunner.query(`DROP INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e"`);
        await queryRunner.query(`DROP TABLE "roles_permissions_permissions"`);
        await queryRunner.query(`DROP TABLE "faq"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
