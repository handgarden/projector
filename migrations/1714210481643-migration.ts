import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714210481643 implements MigrationInterface {
  name = 'Migration1714210481643';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`oauth_profile\` (\`id\` varchar(255) NOT NULL, \`provider\` enum ('GITHUB') NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`, \`provider\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`oauth_profile\` ADD CONSTRAINT \`FK_6e7c1e062d9d1042e2b96c94769\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`oauth_profile\` DROP FOREIGN KEY \`FK_6e7c1e062d9d1042e2b96c94769\``,
    );
    await queryRunner.query(`DROP TABLE \`oauth_profile\``);
  }
}
