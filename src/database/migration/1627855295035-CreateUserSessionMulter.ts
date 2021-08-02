import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserSessionMulter1627855295035 implements MigrationInterface {
    name = 'CreateUserSessionMulter1627855295035'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "Refresh_token" ("id" uuid NOT NULL, "userId" uuid NOT NULL, "expiresIn" integer NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_ab79213a831b49ada44829e19a" UNIQUE ("userId"), CONSTRAINT "PK_35a1af02c819c57647287ea8694" PRIMARY KEY ("id"))')
      await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "gender" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "date_birth" date NOT NULL, "password_hash" character varying NOT NULL, "email_verified" TIMESTAMP WITH TIME ZONE NOT NULL, "admin" boolean NOT NULL DEFAULT false, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))')
      await queryRunner.query('CREATE TABLE "avatar" ("id" uuid NOT NULL, "userId" uuid NOT NULL, "name" character varying NOT NULL, "size" integer NOT NULL, "key" character varying NOT NULL, "url" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_b6abb9e4579bb7fca4d823a5e6" UNIQUE ("userId"), CONSTRAINT "PK_50e36da9d45349941038eaf149d" PRIMARY KEY ("id"))')
      await queryRunner.query('ALTER TABLE "Refresh_token" ADD CONSTRAINT "FK_ab79213a831b49ada44829e19a5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
      await queryRunner.query('ALTER TABLE "avatar" ADD CONSTRAINT "FK_b6abb9e4579bb7fca4d823a5e66" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "avatar" DROP CONSTRAINT "FK_b6abb9e4579bb7fca4d823a5e66"')
      await queryRunner.query('ALTER TABLE "Refresh_token" DROP CONSTRAINT "FK_ab79213a831b49ada44829e19a5"')
      await queryRunner.query('DROP TABLE "avatar"')
      await queryRunner.query('DROP TABLE "users"')
      await queryRunner.query('DROP TABLE "Refresh_token"')
    }
}
