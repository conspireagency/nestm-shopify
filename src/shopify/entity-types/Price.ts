import { Platform, Type } from "@mikro-orm/core";
import { PostgreSqlPlatform } from "@mikro-orm/postgresql";

export class Price extends Type<number, string> {
  public convertToDatabaseValue(value: number, platform: Platform): string {
    this.validatePlatformSupport(platform);
    return value === null ? null : value.toString();
  }

  public convertToJSValue(value: string, platform: Platform): number {
    this.validatePlatformSupport(platform);
    return value === null ? null : Number(value);
  }

  public getColumnType(): string {
    return "numeric(17,2)";
  }

  private validatePlatformSupport(platform: Platform): void {
    if (!(platform instanceof PostgreSqlPlatform)) {
      throw new Error("Numeric custom type implemented only for PG.");
    }
  }
}
