import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';

@Injectable()
export class QuestionService {
  constructor(
    // 依赖注入
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
  ) {}

  async create(username: string) {
    const question = new this.questionModel({
      title: '问卷标题 ' + Date.now(),
      desc: '问卷描述 ' + Date.now(),
      author: username,
      componentList: [
        {
          fe_id: nanoid(),
          type: 'questionInfo',
          title: '问卷信息',
          props: { title: '问卷标题', desc: '问卷描述...' },
        },
      ],
    });

    return await question.save();
  }

  async findOne(id: string) {
    return await this.questionModel.findById(id);
  }

  async delete(id: string, author: string) {
    // return await this.questionModel.findByIdAndDelete(id);
    const res = await this.questionModel.findOneAndDelete({ _id: id, author });
    return res;
  }

  async deleteMany(ids: string[], author: string): Promise<any> {
    return await this.questionModel.deleteMany({ _id: { $in: ids }, author });
  }

  async update(id: string, updateData: Question, author: string) {
    return await this.questionModel.updateOne({ _id: id, author }, updateData);
  }

  async findAllList({
    keyword = '',
    page = 1,
    pageSize = 10,
    isDeleted = false,
    isStar,
    author = '',
  }) {
    const whereOpt: any = {
      author,
      isDeleted,
    };

    if (isStar != null) {
      whereOpt.isStar = isStar;
    }

    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt.title = { $regex: reg }; // 模糊搜索 'abc'
    }

    return this.questionModel
      .find(whereOpt)
      .sort({ _id: 1 }) // _id倒序
      .skip((page - 1) * pageSize) // 跳过
      .limit(pageSize) // 限制
      .exec();
  }

  async countAll({ keyword = '', isDeleted = false, isStar, author = '' }) {
    const whereOpt: any = {
      author,
      isDeleted,
    };

    if (isStar != null) {
      whereOpt.isStar = isStar;
    }

    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt.title = { $regex: reg }; // 模糊搜索 'abc'
    }

    return this.questionModel.countDocuments(whereOpt);
  }
}
