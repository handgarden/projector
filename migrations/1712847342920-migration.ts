import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1712847342920 implements MigrationInterface {
  name = 'Migration1712847342920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` ADD \`image_seq\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` DROP COLUMN \`image_seq\``,
    );
  }
}

