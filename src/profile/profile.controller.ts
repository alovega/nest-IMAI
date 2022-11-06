import { Body, Controller, Post } from '@nestjs/common';
import { ProfileGetDto } from './dto/profile-get-dto';
import { ProfileService } from './profile.service';

@Controller('api/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService){

    }
    @Post()
    async profile(@Body() profileData:ProfileGetDto):Promise<any>{

        return await this.profileService.scrapeProfile(profileData);

    }
}
