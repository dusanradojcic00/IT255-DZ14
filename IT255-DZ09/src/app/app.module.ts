import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoBoxComponent } from './components/video-box/video-box.component';
import { FilterPipe } from './helpers/filter-pipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import {youtubeSearchInjectables} from './services/youtube-search.injectables';
import { YoutubeService } from './services/youtube.service';

@NgModule({
  declarations: [
    AppComponent,
    VideoBoxComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [youtubeSearchInjectables, YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
