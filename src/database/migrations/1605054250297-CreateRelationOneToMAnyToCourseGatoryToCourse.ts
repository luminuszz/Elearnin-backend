import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRelationOneToMAnyToCourseGatoryToCourse1605054250297 implements MigrationInterface {
    name = 'CreateRelationOneToMAnyToCourseGatoryToCourse1605054250297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_category" ADD "courseId" uuid`);
        await queryRunner.query(`ALTER TABLE "course_category" ADD CONSTRAINT "FK_ba11c14aff532fa8cb7cca40f2a" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_category" DROP CONSTRAINT "FK_ba11c14aff532fa8cb7cca40f2a"`);
        await queryRunner.query(`ALTER TABLE "course_category" DROP COLUMN "courseId"`);
    }

}
