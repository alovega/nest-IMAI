import { Injectable } from '@nestjs/common';
import *  as  querystring  from 'query-string'
import 'dotenv/config';
import {curly,} from "node-libcurl";
import { ProfileGetDto } from './dto/profile-get-dto';
import { setTimeout } from 'timers/promises';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom} from 'rxjs';
@Injectable()
export class ProfileService {
    constructor(private readonly httpService: HttpService){}
   async scrapeProfile(profileDetails: ProfileGetDto): Promise<any>{
    profileDetails.scrapper = "instagramProfile";

    const {account, scrapper} = profileDetails
    const {data} = await curly.post(process.env.POSTURL, {
    postFields: querystring.stringify({account: account,scraper: scrapper}),
    httpHeader: [
        'Authorization:Basic Um9iYnlGcmFua1Rlc3Q6aTBEa0V0NEdNVDEzTGpPWlVTY09MTW1UbA',
        'Accept: application/json'
    ]
   });
    //set the await time to 40 seconds 
    // ps I guess my net is slow
    await setTimeout(20000);
    const profile_scrap = await this.getProfileData(data.responseId, process.env.GETURL, scrapper);
    return profile_scrap 
   }
   
    getProfileData = async (responseId:string, url:string, scraper:string) => {
        const {statusCode, data} = await curly(url +'responseId='+responseId + '&' +'scraper=instagramProfile' ,{
            customRequest: 'GET',
            httpHeader: [
                'Authorization:Basic Um9iYnlGcmFua1Rlc3Q6aTBEa0V0NEdNVDEzTGpPWlVTY09MTW1UbA',
                'Accept: application/json',
            ],
        });
        //check if status code is 202 and retry to get the data
        if(statusCode === 202){
            const {statusCode, data} = await curly(url +'responseId='+responseId + '&' +'scraper=instagramProfile' ,{
                customRequest: 'GET',
                httpHeader: [
                    'Authorization:Basic Um9iYnlGcmFua1Rlc3Q6aTBEa0V0NEdNVDEzTGpPWlVTY09MTW1UbA',
                    'Accept: application/json',
                ],
            }); 

            return  {statusCode, data}
        }else{
            return  {statusCode, data}
        }
        
   }

   // fetch or get image data  from  the backend
   async getImage(url){
    // this will get image binary data and convert it to buffer type
    let ImageData  = this.httpService.get(
        `${url}`,
        {responseType: 'arraybuffer'}
        )
    const {data} = await firstValueFrom(ImageData);
    return data
   }
}

