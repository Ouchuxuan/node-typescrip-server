import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1598437586968 implements MigrationInterface {
    name = 'PostRefactoring1598437586968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `user_name` varchar(20) NOT NULL, `password` varchar(120) NOT NULL, `create_time` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `role` (`id` int NOT NULL AUTO_INCREMENT, `role_name` varchar(20) NOT NULL, `permission` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_roels_role` (`userId` int NOT NULL, `roleId` int NOT NULL, INDEX `IDX_93c7ff660bf7be33e4f5954112` (`userId`), INDEX `IDX_0e0ef4333fe393b15316ef664e` (`roleId`), PRIMARY KEY (`userId`, `roleId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_roels_role` ADD CONSTRAINT `FK_93c7ff660bf7be33e4f59541127` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roels_role` ADD CONSTRAINT `FK_0e0ef4333fe393b15316ef664ea` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_roels_role` DROP FOREIGN KEY `FK_0e0ef4333fe393b15316ef664ea`");
        await queryRunner.query("ALTER TABLE `user_roels_role` DROP FOREIGN KEY `FK_93c7ff660bf7be33e4f59541127`");
        await queryRunner.query("DROP INDEX `IDX_0e0ef4333fe393b15316ef664e` ON `user_roels_role`");
        await queryRunner.query("DROP INDEX `IDX_93c7ff660bf7be33e4f5954112` ON `user_roels_role`");
        await queryRunner.query("DROP TABLE `user_roels_role`");
        await queryRunner.query("DROP TABLE `role`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
