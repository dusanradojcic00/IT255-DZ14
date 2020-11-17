import { Component } from '@angular/core';
import { Video } from './models/video';
import { YoutubeService } from './services/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'it255';
  public videos: Video[] = [];
  private _links: string[] = [
    'YiUQE5bJKFU',
    'B32yjbCSVpU',
    'yG0oBPtyNb0',
    'wvUQcnfwUUM',
    'YiUQE5bJKFU',
    'qhZULM69DIw',
    'yG0oBPtyNb0'
  ]

  constructor(private _youtube: YoutubeService) {
    for (let i = 0; i < 6; i++) {
      this.videos.push(this.getVideoDetails(this._links[i]));
    }
  }

  private getVideoDetails(id: string): Video {
    let video = new Video("", "", "https://www.youtube.com/embed/" + id);
    this._youtube.getVideoDetails(id).subscribe((data) => {
      video.title = data.items[0].snippet.title;
      video.description = data.items[0].snippet.description;
    })
    return video;
  }

  public deleteVideo(video: Video) {
    this.videos = this.videos.filter(item => {
      return item.title !== video.title
    })
  }




}

