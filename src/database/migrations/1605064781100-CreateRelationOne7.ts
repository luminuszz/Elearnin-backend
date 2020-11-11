import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRelationOne71605064781100 implements MigrationInterface {
    name = 'CreateRelationOne71605064781100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_3b602b0cf7df363a93ae319f6f2"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "REL_3b602b0cf7df363a93ae319f6f"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "courseCategoryId"`);
        await queryRunner.query(`ALTER TABLE "course_category" ADD "courseId" uuid`);
        await queryRunner.query(`ALTER TABLE "course_category" ADD CONSTRAINT "FK_ba11c14aff532fa8cb7cca40f2a" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_category" DROP CONSTRAINT "FK_ba11c14aff532fa8cb7cca40f2a"`);
        await queryRunner.query(`ALTER TABLE "course_category" DROP COLUMN "courseId"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "courseCategoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "REL_3b602b0cf7df363a93ae319f6f" UNIQUE ("courseCategoryId")`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_3b602b0cf7df363a93ae319f6f2" FOREIGN KEY ("courseCategoryId") REFERENCES "course_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
