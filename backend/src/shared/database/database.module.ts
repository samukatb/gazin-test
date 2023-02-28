import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'DB',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        DatabaseConfig.createTypeOrmOptions(configService),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
