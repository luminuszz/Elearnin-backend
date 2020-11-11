import { User, UserRole } from 'src/modules/users/entities/user.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRelationOne71605063409825 implements MigrationInterface {
  name = 'CreateRelationOne71605063409825'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lessons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "duration" integer NOT NULL, "description" character varying NOT NULL, "video_id" character varying NOT NULL, "course_id" uuid NOT NULL, CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "users_role_enum" AS ENUM('adminUser', 'commonUser')`
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'commonUser', "zip_code" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "course_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_2f133fd8aa7a4d85ff7cd6f7c98" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying, "courseCategoryId" uuid, CONSTRAINT "REL_3b602b0cf7df363a93ae319f6f" UNIQUE ("courseCategoryId"), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "courses_users_users" ("coursesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_c014d020ff83c9f163b3f32f504" PRIMARY KEY ("coursesId", "usersId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_fcbccf87ca25a90b0fe66e29b9" ON "courses_users_users" ("coursesId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_b9720e995db2c9c8d28e1cd1aa" ON "courses_users_users" ("usersId") `
    )
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_3b602b0cf7df363a93ae319f6f2" FOREIGN KEY ("courseCategoryId") REFERENCES "course_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "courses_users_users" ADD CONSTRAINT "FK_fcbccf87ca25a90b0fe66e29b9c" FOREIGN KEY ("coursesId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "courses_users_users" ADD CONSTRAINT "FK_b9720e995db2c9c8d28e1cd1aab" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )

    const userRepository = queryRunner.manager.getRepository(User)

    const AdminSeed = userRepository.create({
      name: 'adminTeste',
      city: 'Salvador',
      state: 'BA',
      email: 'adminTeste@gmail.com',
      passwordHash: '123456',
      zipCode: '544545',
      role: UserRole.admin,
    })

    const userSeed = userRepository.create({
      name: 'adminTeste',
      city: 'Salvador',
      state: 'BA',
      email: '"userTesteeste@gmail.com',
      passwordHash: '123456',
      zipCode: '544545',
      role: UserRole.user,
    })

    await userRepository.save(AdminSeed)
    await userRepository.save(userSeed)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses_users_users" DROP CONSTRAINT "FK_b9720e995db2c9c8d28e1cd1aab"`
    )
    await queryRunner.query(
      `ALTER TABLE "courses_users_users" DROP CONSTRAINT "FK_fcbccf87ca25a90b0fe66e29b9c"`
    )
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_3b602b0cf7df363a93ae319f6f2"`
    )
    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "FK_3c4e299cf8ed04093935e2e22fe"`
    )
    await queryRunner.query(`DROP INDEX "IDX_b9720e995db2c9c8d28e1cd1aa"`)
    await queryRunner.query(`DROP INDEX "IDX_fcbccf87ca25a90b0fe66e29b9"`)
    await queryRunner.query(`DROP TABLE "courses_users_users"`)
    await queryRunner.query(`DROP TABLE "courses"`)
    await queryRunner.query(`DROP TABLE "course_category"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TYPE "users_role_enum"`)
    await queryRunner.query(`DROP TABLE "lessons"`)
  }
}
