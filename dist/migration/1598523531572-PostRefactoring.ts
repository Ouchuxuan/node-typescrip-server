import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1598523531572 implements MigrationInterface {
    name = 'PostRefactoring1598523531572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `create_time` `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `create_time` `create_time` datetime(0) NOT NULL");
    }

}
