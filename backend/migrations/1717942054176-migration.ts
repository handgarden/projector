import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSlideImageTable1717938123456 implements MigrationInterface {
  name = 'UpdateSlideImageTable1717938123456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` DROP FOREIGN KEY \`FK_25d140c186a6af2c0a3fdccaec6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` DROP FOREIGN KEY \`FK_1c86df5ec47f214ff6a77798be6\``,
    );

    // Drop the existing primary key
    await queryRunner.query(`ALTER TABLE \`slide_image\` DROP PRIMARY KEY`);

    // Add new primary key column
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` ADD COLUMN \`id\` int NOT NULL AUTO_INCREMENT PRIMARY KEY`,
    );

    // Add foreign key constraints
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` ADD CONSTRAINT \`FK_1c86df5ec47f214ff6a77798be6\` FOREIGN KEY (\`slide_id\`) REFERENCES \`slide\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` ADD CONSTRAINT \`FK_25d140c186a6af2c0a3fdccaec6\` FOREIGN KEY (\`file_id\`) REFERENCES \`upload_file\`(\`file_key\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` DROP FOREIGN KEY \`FK_25d140c186a6af2c0a3fdccaec6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` DROP FOREIGN KEY \`FK_1c86df5ec47f214ff6a77798be6\``,
    );

    // Drop the new primary key column
    await queryRunner.query(`ALTER TABLE \`slide_image\` DROP COLUMN \`id\``);

    // Restore the original primary key
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` ADD PRIMARY KEY (\`file_id\`, \`id\`)`,
    );

    // Add foreign key constraints back
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` ADD CONSTRAINT \`FK_1c86df5ec47f214ff6a77798be6\` FOREIGN KEY (\`slide_id\`) REFERENCES \`slide\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` ADD CONSTRAINT \`FK_25d140c186a6af2c0a3fdccaec6\` FOREIGN KEY (\`file_id\`) REFERENCES \`upload_file\`(\`file_key\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
