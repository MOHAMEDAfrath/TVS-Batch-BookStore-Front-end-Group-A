import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderServiceService } from './order-service.service';

describe('OrderServiceService', () => {
  let service: OrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(OrderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
