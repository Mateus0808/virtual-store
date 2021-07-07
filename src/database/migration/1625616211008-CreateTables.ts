import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTables1625616211008 implements MigrationInterface {
    name = 'CreateTables1625616211008'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "gender" character varying NOT NULL, "date_birth" TIMESTAMP NOT NULL, "password_hash" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))')
      await queryRunner.query('CREATE TABLE "products" ("id" uuid NOT NULL, "product_name" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "image_url" character varying NOT NULL, "category" character varying NOT NULL, "quantity_stock" integer NOT NULL, "manufacturer" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))')
      await queryRunner.query('ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"')
      await queryRunner.query('DROP TABLE "products"')
      await queryRunner.query('DROP TABLE "users"')
    }
}
