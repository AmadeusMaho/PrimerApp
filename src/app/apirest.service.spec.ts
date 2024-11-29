import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApirestService } from './apirest.service';

describe('ApirestService', () => {
  let apirestService: ApirestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
      ],
      providers: [ApirestService], 
    });

    apirestService = TestBed.inject(ApirestService); 
  });

  it('should be created', () => {
    expect(apirestService).toBeTruthy();
  });
});
