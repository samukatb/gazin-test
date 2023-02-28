import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Developer } from 'src/modules/developer/entities/developer.entity';
import { Level } from 'src/modules/level/entities/level.entity';

export class DatabaseConfig {
  static createTypeOrmOptions(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      url: configService.get('DATABASE_URL'),
      ssl:
        configService.get('NODE_ENV') === 'production'
          ? { rejectUnauthorized: false }
          : false,
      useUTC: true,
      type: 'postgres',
      entities: [Developer, Level],
      synchronize: true,
      logging: false,
      migrationsRun: false,
      migrations: [],
    };
  }
}
