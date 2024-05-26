import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1712430622372 implements MigrationInterface {
  name = 'Migration1712430622372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`slide\` (\`id\` int NOT NULL AUTO_INCREMENT, \`seq\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`project_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`slide_image\` (\`slide_id\` int NOT NULL, \`file_id\` varchar(255) NOT NULL, PRIMARY KEY (\`slide_id\`, \`file_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_1cf56b10b23971cfd07e4fc6126\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide\` ADD CONSTRAINT \`FK_080d2a8b2d7cbfdc20a53d5ca04\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` ADD CONSTRAINT \`FK_1c86df5ec47f214ff6a77798be6\` FOREIGN KEY (\`slide_id\`) REFERENCES \`slide\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` ADD CONSTRAINT \`FK_25d140c186a6af2c0a3fdccaec6\` FOREIGN KEY (\`file_id\`) REFERENCES \`upload_file\`(\`file_key\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` DROP FOREIGN KEY \`FK_25d140c186a6af2c0a3fdccaec6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide_image\` DROP FOREIGN KEY \`FK_1c86df5ec47f214ff6a77798be6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`slide\` DROP FOREIGN KEY \`FK_080d2a8b2d7cbfdc20a53d5ca04\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_1cf56b10b23971cfd07e4fc6126\``,
    );
    await queryRunner.query(`DROP TABLE \`slide_image\``);
    await queryRunner.query(`DROP TABLE \`slide\``);
    await queryRunner.query(`DROP TABLE \`project\``);
  }
}
