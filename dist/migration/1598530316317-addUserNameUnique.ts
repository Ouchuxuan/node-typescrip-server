import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserNameUnique1598530316317 implements MigrationInterface {
    name = 'addUserNameUnique1598530316317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_d34106f8ec1ebaf66f4f8609dd` (`user_name`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_d34106f8ec1ebaf66f4f8609dd`");
    }

}
