import { Injectable } from '@nestjs/common';
import *  as  querystring  from 'query-string'
import 'dotenv/config';
import {curly, Curl} from "node-libcurl";
import { ProfileGetDto } from './dto/profile-get-dto';
import { setTimeout } from 'timers/promises';
@Injectable()
export class ProfileService {
   async scrapeProfile(profileDetails: ProfileGetDto): Promise<any>{
    let profile = {};
    profileDetails.scrapper = "instagramProfile";

    const {account, scrapper} = profileDetails
   const {data} = await curly.post(process.env.POSTURL, {
    postFields: querystring.stringify({account: account,scraper: scrapper}),
    httpHeader: [
        'Authorization:Basic Um9iYnlGcmFua1Rlc3Q6aTBEa0V0NEdNVDEzTGpPWlVTY09MTW1UbA',
        'Accept: application/json'
    ]
   });

    await setTimeout(15000);
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
        if(statusCode === 202){
            const {statusCode, data} = await curly(url +'responseId='+responseId + '&' +'scraper=instagramProfile' ,{
                customRequest: 'GET',
                httpHeader: [
                    'Authorization:Basic Um9iYnlGcmFua1Rlc3Q6aTBEa0V0NEdNVDEzTGpPWlVTY09MTW1UbA',
                    'Accept: application/json',
                ],
            }); 

            return  {statusCode, data}
        }
        return  {statusCode, data}
   }
}
