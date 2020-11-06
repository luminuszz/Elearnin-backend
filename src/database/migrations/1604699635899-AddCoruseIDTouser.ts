import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class AddCoruseIDTouser1604699635899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'course_id',
        type: 'uuid',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'CourseIdForeignKey',
        columnNames: ['course_id'],
        referencedTableName: 'courses',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'CourseIdForeignKey')

    await queryRunner.dropColumn('users', 'course_id')
  }
}
