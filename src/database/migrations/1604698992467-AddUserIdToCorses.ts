import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class AddUserIdToCorses1604698992467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKey(
      'courses',
      new TableForeignKey({
        name: 'UserIDForeignKey',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('courses', 'UserIDForeignKey')

    await queryRunner.dropColumn('courses', 'user_id')
  }
}
