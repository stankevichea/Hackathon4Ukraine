import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDamageReport1647706480401 implements MigrationInterface {
  name = 'CreateDamageReport1647706480401';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."damage-report_damage_degree_enum" AS ENUM('worksCorrectly', 'worksPartially', 'doesNotWork')`,
    );
    await queryRunner.query(
      `CREATE TABLE "damage-report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "point" geometry(Point) NOT NULL, "damage_degree" "public"."damage-report_damage_degree_enum" NOT NULL, "reporter_ip" text, CONSTRAINT "PK_54ee9760307657236cac73f297a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "damage-report"`);
    await queryRunner.query(
      `DROP TYPE "public"."damage-report_damage_degree_enum"`,
    );
  }
}
