import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddRoleColumnToUser1604709233297 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'role', type: 'varchar', isNullable: false })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'role')
  }
}
