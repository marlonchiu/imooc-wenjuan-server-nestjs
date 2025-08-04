import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';

@Controller('question')
export class QuestionController {
  @Get()
  findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    console.log(keyword, page, pageSize);
    return {
      list: ['a', 'b', 'c'],
      count: 100,
    };
  }

  // get 中的 id 要和 @Param('id')  一致
  @Get(':id')
  findOne(@Param('id') uid: string) {
    console.log(uid);
    return {
      id: '1',
      title: 'title',
      desc: 'content',
    };
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() questionDto: QuestionDto) {
    console.log(id, questionDto);
    return {
      id,
      questionDto,
    };
  }

  // @Get('/test')
  // getTest(): string {
  //   return 'question test';
  // }
}
