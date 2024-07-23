import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  @EventPattern('user_created')
  async handleUserCreated(@Payload() message) {
    console.log('Consumed message from Kafka:', message);
  }
}
