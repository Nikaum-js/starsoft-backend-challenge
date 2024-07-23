import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  private readonly logger = new Logger(KafkaController.name);

  @EventPattern('user_created')
  async handleUserCreated(@Payload() message) {
    this.logger.log('User created:', message);
  }

  @EventPattern('user_updated')
  async handleUserUpdated(@Payload() message) {
    this.logger.log('User updated:', message);
  }

  @EventPattern('user_deleted')
  async handleUserDeleted(@Payload() message) {
    this.logger.log('User deleted:', message);
  }
}
