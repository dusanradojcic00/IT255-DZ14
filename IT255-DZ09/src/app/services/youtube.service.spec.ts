import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { YoutubeService, YOUTUBE_API_KEY, YOUTUBE_API_URL } from './youtube.service';
import { youtubeSearchInjectables } from './youtube-search.injectables';

describe('YoutubeService', () => {
  let service: YoutubeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YoutubeService, youtubeSearchInjectables]
    })

    service = TestBed.inject(YoutubeService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
  })

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  })

  it('Should retrieve data', () => {
    let id = "YiUQE5bJKFU";
    const dummyRequest = {
      items: [{
        snippet: {
          title: "Title",
          description: "Description"
        }
      }]
    }

    service.getVideoDetails(id).subscribe((data) => {
      expect(data.items[0].snippet.title).toBe("Title");
      expect(data.items[0].snippet.description).toBe("Description");
    });

    const params: string = [
      `id=${id}`,
      `part=snippet`,
      `key=${YOUTUBE_API_KEY}`,
    ].join('&');
    const req = httpMock.expectOne(`${YOUTUBE_API_URL}?${params}`);

    expect(req.request.method).toBe('GET');

    req.flush(dummyRequest);
  })

  it('Returns embedded link from URL', () => {
    const embeded = service.getEmbedLink("https://www.youtube.com/watch?v=4JVnSkR04tM");
    expect(embeded).toBe("https://www.youtube.com/embed/4JVnSkR04tM");
  })

  it('Returns embedded link from ID', () => {
    const embeded = service.getEmbedLink("4JVnSkR04tM");
    expect(embeded).toBe("https://www.youtube.com/embed/4JVnSkR04tM");
  })
});
