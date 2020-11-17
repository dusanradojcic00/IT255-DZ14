import {
    YoutubeService,
    YOUTUBE_API_KEY,
    YOUTUBE_API_URL
  } from './youtube.service';
   
  export const youtubeSearchInjectables: Array<any> = [
    {provide: YoutubeService, useClass: YoutubeService},
    {provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY},
    {provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL}
  ];