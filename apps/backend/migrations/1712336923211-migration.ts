import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712336923211 implements MigrationInterface {
    name = 'Migration1712336923211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`upload_file\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`file_key\` varchar(255) NOT NULL, \`originalName\` varchar(255) NOT NULL, \`bucket\` varchar(255) NOT NULL, PRIMARY KEY (\`file_key\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`upload_file\``);
    }

}
