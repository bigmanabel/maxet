import { Injectable } from '@nestjs/common';

@Injectable()
export class ListingsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
