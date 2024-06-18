import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717943463369 implements MigrationInterface {
  name = 'Migration1717943463369';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` DROP FOREIGN KEY \`FK_1c86df5ec47f214ff6a77798be6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` ADD CONSTRAINT \`FK_1c86df5ec47f214ff6a77798be6\` FOREIGN KEY (\`slide_id\`) REFERENCES \`slide\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` DROP FOREIGN KEY \`FK_1c86df5ec47f214ff6a77798be6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` ADD CONSTRAINT \`FK_1c86df5ec47f214ff6a77798be6\` FOREIGN KEY (\`slide_id\`) REFERENCES \`slide\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
