import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export abstract class LogManager {
  public abstract setContext(context: string): void;

  public abstract log(message: any, ...optionalParams: any[]): void;

  public abstract fatal(message: any, ...optionalParams: any[]): void;

  public abstract error(message: any, ...optionalParams: any[]): void;

  public abstract warn(message: any, ...optionalParams: any[]): void;

  public abstract debug?(message: any, ...optionalParams: any[]): void;

  public abstract verbose?(message: any, ...optionalParams: any[]): void;
}
