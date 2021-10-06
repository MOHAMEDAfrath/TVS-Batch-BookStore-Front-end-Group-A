import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FeedBackService } from './feed-back.service';

describe('FeedBackService', () => {
  let service: FeedBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(FeedBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
