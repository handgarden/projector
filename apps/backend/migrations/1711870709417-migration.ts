import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711870709417 implements MigrationInterface {
    name = 'Migration1711870709417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`account\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_4ab2df0a57a74fdf904e0e2708\` (\`account\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_4ab2df0a57a74fdf904e0e2708\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
