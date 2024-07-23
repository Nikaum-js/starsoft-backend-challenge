import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveAvatarUrlFromUser1689808204215
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');
    const column = table?.findColumnByName('avatar_url');

    if (column) {
      await queryRunner.query(`
        ALTER TABLE "user" DROP COLUMN "avatar_url";
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user" ADD "avatar_url" character varying;
    `);
  }
}
