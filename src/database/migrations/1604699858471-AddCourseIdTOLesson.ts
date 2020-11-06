import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class AddCourseIdTOLesson1604699858471 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'lessons',
      new TableColumn({
        name: 'course_id',
        type: 'uuid',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKey(
      'lessons',
      new TableForeignKey({
        name: 'CourseIdForeignKey',
        columnNames: ['course_id'],
        referencedTableName: 'courses',
        referencedColumnNames: ['id'],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lessons', 'CourseIdForeignKey')

    await queryRunner.dropColumn('lessons', 'course_id')
  }
}
