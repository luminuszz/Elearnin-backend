import { User, UserRole } from 'src/modules/users/entities/user.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { hash } from 'bcrypt'

export class PopulateAdmins1604797403945 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User)
    const passwordHash = await hash('123456', 10)

    const AdminSeed = userRepository.create({
      name: 'adminTeste',
      city: 'Salvador',
      state: 'BA',
      email: 'adminTeste@gmail.com',
      passwordHash,
      zipCode: '544545',
      role: UserRole.admin,
    })

    await userRepository.save(AdminSeed)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
