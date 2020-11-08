import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersCoursesCoureses1604874325104
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_courses_courses',
        columns: [
          { name: 'usersId', type: 'uuid' },
          { name: 'coursesId', type: 'uuid' },
        ],
        foreignKeys: [
          {
            name: 'usersIdDForreignkey',
            columnNames: ['usersId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'coursesIDForreignkey',
            columnNames: ['coursesId'],
            referencedTableName: 'courses',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'users_courses_courses',
      'usersIdDForreignkey'
    )
    await queryRunner.dropForeignKey(
      'coursesIDForreignkey',
      'usersIdDForreignkey'
    )
  }
}
