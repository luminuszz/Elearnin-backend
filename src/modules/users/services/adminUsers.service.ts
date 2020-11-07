import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dtos/createUserDto'
import { User } from '../entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AdminUserService {
  private role: string

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {
    this.role = 'admin'
  }

  public async getAdminUsers(): Promise<User[]> {
    const adminUsers = await this.usersRepository.find({
      where: { role: this.role },
    })

    return adminUsers
  }

  public async createAdminUser(data: CreateUserDto): Promise<User> {
    console.log(this.role)

    const passwordHash = await bcrypt.hash(data.password, 10)

    const newAdminUser = this.usersRepository.create({
      ...data,
      passwordHash,
      role: this.role,
    })

    await this.usersRepository.save(newAdminUser)

    return newAdminUser
  }

  public async findAdminUserById(id: string): Promise<User> {
    const admin = await this.usersRepository.findOne(id)

    return admin
  }
}
