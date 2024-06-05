import { Get } from '@nestjs/common';
import { ApiController } from '../common/decorator/ApiController';
import { RestTemplate } from '../common/response/RestTemplate';

@ApiController('/health')
export class HealthController {
  constructor() {}

  @Get()
  get() {
    return RestTemplate.OK();
  }
}
