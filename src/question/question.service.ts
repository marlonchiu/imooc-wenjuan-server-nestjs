import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuestionService {
  constructor(
    // 依赖注入
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
  ) {}

  async create() {
    const question = new this.questionModel({
      title: 'title' + Date.now(),
      desc: 'description of question',
    });

    return await question.save();
  }

  async findOne(id: string) {
    return await this.questionModel.findById(id);
  }
}
