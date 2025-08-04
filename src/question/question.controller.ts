import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  HttpException,
  HttpStatus,
  Post,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto } from './dto/question.dto';

@Controller('question')
export class QuestionController {
  // 依赖注入
  constructor(private readonly questionService: QuestionService) {}

  @Post('/create')
  async create() {
    return await this.questionService.create();
  }

  // 测试错误
  @Get('/error')
  getTest(): string {
    throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST);
  }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    console.log(keyword, page, pageSize);
    const list = await this.questionService.findAllList({
      keyword,
      page,
      pageSize,
    });
    const count = await this.questionService.countAll({ keyword });
    return {
      list,
      count,
    };
    // return {
    //   list: ['a', 'b', 'c'],
    //   count: 100,
    // };
  }

  // get 中的 id 要和 @Param('id')  一致
  // @Get(':id')
  // findOne(@Param('id') uid: string) {
  //   console.log(uid);
  //   return {
  //     id: '1',
  //     title: 'title',
  //     desc: 'content',
  //   };
  // }
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.questionService.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.questionService.delete(id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() questionDto: QuestionDto) {
    return this.questionService.update(id, questionDto);
    // console.log(id, questionDto);
    // return {
    //   id,
    //   questionDto,
    // };
  }

  // @Get('/test')
  // getTest(): string {
  //   return 'question test';
  // }
}
