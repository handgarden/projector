import { Get } from '@nestjs/common';
import { RestTemplate } from './common/response/RestTemplate';
import { ApiController } from './common/decorator/ApiController';

@ApiController('/health')
export class HealthController {
  constructor() {}

  @Get()
  get() {
    return RestTemplate.OK();
  }
}
