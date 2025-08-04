import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  // HttpException,
  // HttpStatus,
  Post,
  Delete,
  Request,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto } from './dto/question.dto';

@Controller('question')
export class QuestionController {
  // 依赖注入
  constructor(private readonly questionService: QuestionService) {}

  @Post('create')
  async create(@Request() req) {
    const { username } = req.user;
    return await this.questionService.create(username);
  }

  // 测试错误
  // @Get('error')
  // getTest(): string {
  //   throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST);
  // }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('isDeleted') isDeleted: boolean = false,
    @Query('isStar') isStar: boolean = false,
    @Request() req,
  ) {
    const { username } = req.user;
    const list = await this.questionService.findAllList({
      keyword,
      page,
      pageSize,
      isDeleted,
      isStar,
      author: username,
    });
    const count = await this.questionService.countAll({
      keyword,
      isDeleted,
      isStar,
      author: username,
    });
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
  deleteOne(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    return this.questionService.delete(id, username);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() questionDto: QuestionDto,
    @Request() req,
  ) {
    const { username } = req.user;
    return this.questionService.update(id, questionDto, username);
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

  @Delete()
  deleteMany(@Body() body, @Request() req) {
    const { ids = [] } = body;
    const { username } = req.user;
    return this.questionService.deleteMany(ids, username);
  }

  @Post('/duplicate/:id')
  duplicate(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    return this.questionService.duplicate(id, username);
  }
}
