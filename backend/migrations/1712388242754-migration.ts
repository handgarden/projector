import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1712388242754 implements MigrationInterface {
  name = 'Migration1712388242754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`upload_file\` ADD \`uploader_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`upload_file\` ADD CONSTRAINT \`FK_ea1bbb0bef3ed3018539cc1b5e3\` FOREIGN KEY (\`uploader_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`upload_file\` DROP FOREIGN KEY \`FK_ea1bbb0bef3ed3018539cc1b5e3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`upload_file\` DROP COLUMN \`uploader_id\``,
    );
  }
}
