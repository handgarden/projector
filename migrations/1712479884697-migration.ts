import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1712479884697 implements MigrationInterface {
  name = 'Migration1712479884697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`slide\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`slide\` DROP COLUMN \`created_at\``);
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
  }
}
