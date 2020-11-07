import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnIsFinishTOLesson1604784793014
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'lessons',
      new TableColumn({
        name: 'is_finish',
        type: 'boolean',
        isNullable: false,
        default: 'false',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('lessons', 'is_finish')
  }
}
