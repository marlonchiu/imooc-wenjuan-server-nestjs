## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 生成模块指令
```bash
$ nest g module <module-name>
$ nest g controller <module-name> --no-spec
$ nest g service <module-name> --no-spec

# nest g module question
# nest g controller question --no-spec # 不需要测试文件
# nest g service question --no-spec

# 生成拦截器
$ nest g interceptor transform --no-spec
# 生成过滤器
$ nest g filter http-exception --no-spec
```


## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

## Resources


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
