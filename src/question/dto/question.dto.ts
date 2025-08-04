//  dto 数据传输对象 data transfer object

export class QuestionDto {
  readonly title: string;
  readonly desc: string;
  readonly js: string;
  readonly css: string;
  readonly isPublished: boolean;
  readonly isStar: boolean;
  readonly isDeleted: boolean;
  readonly author: string;
  readonly componentList: [
    {
      fe_id: string;
      type: string;
      title: string;
      isHidden: boolean;
      isLocked: boolean;
      props: object;
    },
  ];
}
