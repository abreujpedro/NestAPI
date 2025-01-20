import { Injectable, Scope } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ scope: Scope.REQUEST })
export class IdentifyRequestLogger {
  private context = uuidv4();

  public getContext(): string {
    return this.context;
  }
}
