import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { createUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
  constructor(
    // 依赖注入
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // 创建用户
  async create(createUserDto: createUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // 查找用户
  async findOne(username: string, password: string) {
    return this.userModel.findOne({ username, password });
  }
}
