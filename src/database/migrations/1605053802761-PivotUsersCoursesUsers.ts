import {MigrationInterface, QueryRunner} from "typeorm";

export class PivotUsersCoursesUsers1605053802761 implements MigrationInterface {
    name = 'PivotUsersCoursesUsers1605053802761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses_users_users" ("coursesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_c014d020ff83c9f163b3f32f504" PRIMARY KEY ("coursesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fcbccf87ca25a90b0fe66e29b9" ON "courses_users_users" ("coursesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b9720e995db2c9c8d28e1cd1aa" ON "courses_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "courses_users_users" ADD CONSTRAINT "FK_fcbccf87ca25a90b0fe66e29b9c" FOREIGN KEY ("coursesId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses_users_users" ADD CONSTRAINT "FK_b9720e995db2c9c8d28e1cd1aab" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses_users_users" DROP CONSTRAINT "FK_b9720e995db2c9c8d28e1cd1aab"`);
        await queryRunner.query(`ALTER TABLE "courses_users_users" DROP CONSTRAINT "FK_fcbccf87ca25a90b0fe66e29b9c"`);
        await queryRunner.query(`DROP INDEX "IDX_b9720e995db2c9c8d28e1cd1aa"`);
        await queryRunner.query(`DROP INDEX "IDX_fcbccf87ca25a90b0fe66e29b9"`);
        await queryRunner.query(`DROP TABLE "courses_users_users"`);
    }

}
