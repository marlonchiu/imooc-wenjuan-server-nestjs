import { Controller, Get } from '@nestjs/common';

@Controller('question')
export class QuestionController {
  @Get()
  findAll() {
    return {
      list: ['a', 'b', 'c'],
      count: 100,
    };
  }

  @Get('/test')
  getTest(): string {
    return 'question test';
  }
}
