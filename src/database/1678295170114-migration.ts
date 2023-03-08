import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1678295170114 implements MigrationInterface {
  name = 'migration1678295170114';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."media_type_enum" AS ENUM('audio', 'image')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."media_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "type" "public"."media_type_enum" NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "status" "public"."media_status_enum" NOT NULL, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(`DROP TYPE "public"."media_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."media_type_enum"`);
  }
}
