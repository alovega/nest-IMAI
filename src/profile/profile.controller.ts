import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { response } from 'express';
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

    @Get('image')
    async getImage(@Query('url') url:string):Promise<any>{
        // convert the data to base64 to be able to render in client
        let data = {
            image: Buffer.from(await this.profileService.getImage(url), 'binary').toString('base64'),
            extension: 'base64',
        }
        return data;
    }
}
