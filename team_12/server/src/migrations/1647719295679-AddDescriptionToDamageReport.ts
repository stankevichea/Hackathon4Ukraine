import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionToDamageReport1647719295679
  implements MigrationInterface
{
  name = 'AddDescriptionToDamageReport1647719295679';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "damage-report" ADD "description" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "damage-report" DROP COLUMN "description"`,
    );
  }
}
