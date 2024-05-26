import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712755820637 implements MigrationInterface {
    name = 'Migration1712755820637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`description\``);
    }

}
