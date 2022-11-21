import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
