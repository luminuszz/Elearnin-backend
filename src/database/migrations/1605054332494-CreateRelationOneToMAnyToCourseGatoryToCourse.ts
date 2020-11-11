import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRelationOneToMAnyToCourseGatoryToCourse1605054332494
  implements MigrationInterface {
  name = 'CreateRelationOneToMAnyToCourseGatoryToCourse1605054332494'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_category" DROP CONSTRAINT "FK_ba11c14aff532fa8cb7cca40f2a"`
    )
    await queryRunner.query(
      `ALTER TABLE "course_category" RENAME COLUMN "courseId" TO "coursesId"`
    )
    await queryRunner.query(
      `ALTER TABLE "course_category" ADD CONSTRAINT "FK_3419e2c72881d35fb510fc27f81" FOREIGN KEY ("coursesId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_category" DROP CONSTRAINT "FK_3419e2c72881d35fb510fc27f81"`
    )
    await queryRunner.query(
      `ALTER TABLE "course_category" RENAME COLUMN "coursesId" TO "courseId"`
    )
    await queryRunner.query(
      `ALTER TABLE "course_category" ADD CONSTRAINT "FK_ba11c14aff532fa8cb7cca40f2a" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
