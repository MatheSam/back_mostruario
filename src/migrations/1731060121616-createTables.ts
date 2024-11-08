import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1731060121616 implements MigrationInterface {
    name = 'CreateTables1731060121616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(100) NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "is_adm" boolean NOT NULL DEFAULT (0), "is_faq" boolean NOT NULL DEFAULT (0), "is_post" boolean NOT NULL DEFAULT (0), "is_user" boolean NOT NULL DEFAULT (0), "is_product" boolean NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "colors" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "hexadecimal" varchar(100) NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_e271c8fa9391b29979e3958146e" UNIQUE ("title"), CONSTRAINT "UQ_d2a2334c707bdbf2245cd49b6d7" UNIQUE ("hexadecimal"))`);
        await queryRunner.query(`CREATE TABLE "imgs" ("id" varchar PRIMARY KEY NOT NULL, "img" varchar NOT NULL, "is_main" boolean NOT NULL DEFAULT (0), "img_order" integer NOT NULL DEFAULT (99), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "productImgsId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "products_imgs" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "url" varchar(150), "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`CREATE TABLE "sub_categories" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "url" varchar(100) NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "categoryId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "marcas" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "url" varchar(100) NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_03708c221f2bcc58341a7b9e6da" UNIQUE ("title"), CONSTRAINT "UQ_59e31b558bf7dd1f9effc56a472" UNIQUE ("url"))`);
        await queryRunner.query(`CREATE TABLE "gender" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(20) NOT NULL, "sigla" varchar(1) NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_6812eb1ecf9879dc6979c5bd82c" UNIQUE ("title"), CONSTRAINT "UQ_5c2477c9b7689bdd821ad4c6582" UNIQUE ("sigla"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "url" varchar(100) NOT NULL, "short_descr" varchar NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "price" decimal(12,2) NOT NULL, "promotion" decimal(12,2) NOT NULL, "a_vista" decimal(12,2) NOT NULL, "juros" boolean NOT NULL, "parcelado" decimal(12,2) NOT NULL, "qtde_parcelado" integer NOT NULL, "caracteristicas" varchar NOT NULL, "descr" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "subcategoryId" varchar NOT NULL, "marcaId" varchar, "genderId" varchar)`);
        await queryRunner.query(`CREATE TABLE "products_variations" ("id" varchar PRIMARY KEY NOT NULL, "estoque" integer NOT NULL, "productId" varchar NOT NULL, "sizesId" varchar NOT NULL, "colorsId" varchar NOT NULL, "productImgsId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "sizes" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), CONSTRAINT "UQ_69328e24efc145becc45c974e95" UNIQUE ("title"))`);
        await queryRunner.query(`CREATE TABLE "faq" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar, CONSTRAINT "FK_da1a6a4fc2bced49477262cfd41" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_posts"("id", "title", "descr", "is_active", "created_at", "updated_at", "usersId") SELECT "id", "title", "descr", "is_active", "created_at", "updated_at", "usersId" FROM "posts"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`);
        await queryRunner.query(`CREATE TABLE "temporary_imgs" ("id" varchar PRIMARY KEY NOT NULL, "img" varchar NOT NULL, "is_main" boolean NOT NULL DEFAULT (0), "img_order" integer NOT NULL DEFAULT (99), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "productImgsId" varchar NOT NULL, CONSTRAINT "FK_f269f976b81b7ecde7716000af3" FOREIGN KEY ("productImgsId") REFERENCES "products_imgs" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_imgs"("id", "img", "is_main", "img_order", "created_at", "updated_at", "productImgsId") SELECT "id", "img", "is_main", "img_order", "created_at", "updated_at", "productImgsId" FROM "imgs"`);
        await queryRunner.query(`DROP TABLE "imgs"`);
        await queryRunner.query(`ALTER TABLE "temporary_imgs" RENAME TO "imgs"`);
        await queryRunner.query(`CREATE TABLE "temporary_sub_categories" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "url" varchar(100) NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "categoryId" varchar NOT NULL, CONSTRAINT "FK_dfa3adf1b46e582626b295d0257" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_sub_categories"("id", "title", "url", "is_active", "created_at", "updated_at", "categoryId") SELECT "id", "title", "url", "is_active", "created_at", "updated_at", "categoryId" FROM "sub_categories"`);
        await queryRunner.query(`DROP TABLE "sub_categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_sub_categories" RENAME TO "sub_categories"`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "url" varchar(100) NOT NULL, "short_descr" varchar NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "price" decimal(12,2) NOT NULL, "promotion" decimal(12,2) NOT NULL, "a_vista" decimal(12,2) NOT NULL, "juros" boolean NOT NULL, "parcelado" decimal(12,2) NOT NULL, "qtde_parcelado" integer NOT NULL, "caracteristicas" varchar NOT NULL, "descr" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "subcategoryId" varchar NOT NULL, "marcaId" varchar, "genderId" varchar, CONSTRAINT "FK_7527f75cb36bea4b7f2b86f7d1d" FOREIGN KEY ("subcategoryId") REFERENCES "sub_categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_35e52384f95b428fc0ff3e78625" FOREIGN KEY ("marcaId") REFERENCES "marcas" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7939e5d8b79e9562cbaae72872c" FOREIGN KEY ("genderId") REFERENCES "gender" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "title", "url", "short_descr", "is_active", "price", "promotion", "a_vista", "juros", "parcelado", "qtde_parcelado", "caracteristicas", "descr", "created_at", "updated_at", "subcategoryId", "marcaId", "genderId") SELECT "id", "title", "url", "short_descr", "is_active", "price", "promotion", "a_vista", "juros", "parcelado", "qtde_parcelado", "caracteristicas", "descr", "created_at", "updated_at", "subcategoryId", "marcaId", "genderId" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
        await queryRunner.query(`CREATE TABLE "temporary_products_variations" ("id" varchar PRIMARY KEY NOT NULL, "estoque" integer NOT NULL, "productId" varchar NOT NULL, "sizesId" varchar NOT NULL, "colorsId" varchar NOT NULL, "productImgsId" varchar NOT NULL, CONSTRAINT "FK_9aaf8986294b0ee1c87a242edea" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cf98b773f872afc5a9d822fcb3a" FOREIGN KEY ("sizesId") REFERENCES "sizes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c64c46abfce33be89ab0e6d3544" FOREIGN KEY ("colorsId") REFERENCES "colors" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_aa9b067704f1f1010b6bfbcfe7f" FOREIGN KEY ("productImgsId") REFERENCES "products_imgs" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products_variations"("id", "estoque", "productId", "sizesId", "colorsId", "productImgsId") SELECT "id", "estoque", "productId", "sizesId", "colorsId", "productImgsId" FROM "products_variations"`);
        await queryRunner.query(`DROP TABLE "products_variations"`);
        await queryRunner.query(`ALTER TABLE "temporary_products_variations" RENAME TO "products_variations"`);
        await queryRunner.query(`CREATE TABLE "temporary_faq" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar, CONSTRAINT "FK_dfdac2f5f4385de33b03ae472c6" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_faq"("id", "title", "descr", "is_active", "created_at", "updated_at", "usersId") SELECT "id", "title", "descr", "is_active", "created_at", "updated_at", "usersId" FROM "faq"`);
        await queryRunner.query(`DROP TABLE "faq"`);
        await queryRunner.query(`ALTER TABLE "temporary_faq" RENAME TO "faq"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "faq" RENAME TO "temporary_faq"`);
        await queryRunner.query(`CREATE TABLE "faq" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar)`);
        await queryRunner.query(`INSERT INTO "faq"("id", "title", "descr", "is_active", "created_at", "updated_at", "usersId") SELECT "id", "title", "descr", "is_active", "created_at", "updated_at", "usersId" FROM "temporary_faq"`);
        await queryRunner.query(`DROP TABLE "temporary_faq"`);
        await queryRunner.query(`ALTER TABLE "products_variations" RENAME TO "temporary_products_variations"`);
        await queryRunner.query(`CREATE TABLE "products_variations" ("id" varchar PRIMARY KEY NOT NULL, "estoque" integer NOT NULL, "productId" varchar NOT NULL, "sizesId" varchar NOT NULL, "colorsId" varchar NOT NULL, "productImgsId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "products_variations"("id", "estoque", "productId", "sizesId", "colorsId", "productImgsId") SELECT "id", "estoque", "productId", "sizesId", "colorsId", "productImgsId" FROM "temporary_products_variations"`);
        await queryRunner.query(`DROP TABLE "temporary_products_variations"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "url" varchar(100) NOT NULL, "short_descr" varchar NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "price" decimal(12,2) NOT NULL, "promotion" decimal(12,2) NOT NULL, "a_vista" decimal(12,2) NOT NULL, "juros" boolean NOT NULL, "parcelado" decimal(12,2) NOT NULL, "qtde_parcelado" integer NOT NULL, "caracteristicas" varchar NOT NULL, "descr" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "subcategoryId" varchar NOT NULL, "marcaId" varchar, "genderId" varchar)`);
        await queryRunner.query(`INSERT INTO "products"("id", "title", "url", "short_descr", "is_active", "price", "promotion", "a_vista", "juros", "parcelado", "qtde_parcelado", "caracteristicas", "descr", "created_at", "updated_at", "subcategoryId", "marcaId", "genderId") SELECT "id", "title", "url", "short_descr", "is_active", "price", "promotion", "a_vista", "juros", "parcelado", "qtde_parcelado", "caracteristicas", "descr", "created_at", "updated_at", "subcategoryId", "marcaId", "genderId" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`ALTER TABLE "sub_categories" RENAME TO "temporary_sub_categories"`);
        await queryRunner.query(`CREATE TABLE "sub_categories" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "url" varchar(100) NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "categoryId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "sub_categories"("id", "title", "url", "is_active", "created_at", "updated_at", "categoryId") SELECT "id", "title", "url", "is_active", "created_at", "updated_at", "categoryId" FROM "temporary_sub_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_sub_categories"`);
        await queryRunner.query(`ALTER TABLE "imgs" RENAME TO "temporary_imgs"`);
        await queryRunner.query(`CREATE TABLE "imgs" ("id" varchar PRIMARY KEY NOT NULL, "img" varchar NOT NULL, "is_main" boolean NOT NULL DEFAULT (0), "img_order" integer NOT NULL DEFAULT (99), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "productImgsId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "imgs"("id", "img", "is_main", "img_order", "created_at", "updated_at", "productImgsId") SELECT "id", "img", "is_main", "img_order", "created_at", "updated_at", "productImgsId" FROM "temporary_imgs"`);
        await queryRunner.query(`DROP TABLE "temporary_imgs"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "descr" text NOT NULL, "is_active" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "usersId" varchar)`);
        await queryRunner.query(`INSERT INTO "posts"("id", "title", "descr", "is_active", "created_at", "updated_at", "usersId") SELECT "id", "title", "descr", "is_active", "created_at", "updated_at", "usersId" FROM "temporary_posts"`);
        await queryRunner.query(`DROP TABLE "temporary_posts"`);
        await queryRunner.query(`DROP TABLE "faq"`);
        await queryRunner.query(`DROP TABLE "sizes"`);
        await queryRunner.query(`DROP TABLE "products_variations"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "gender"`);
        await queryRunner.query(`DROP TABLE "marcas"`);
        await queryRunner.query(`DROP TABLE "sub_categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products_imgs"`);
        await queryRunner.query(`DROP TABLE "imgs"`);
        await queryRunner.query(`DROP TABLE "colors"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}