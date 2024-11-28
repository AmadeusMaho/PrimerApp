import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApirestService } from './apirest.service';

describe('ApirestService', () => {
  let apirestService: ApirestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // For mocking HTTP requests
      ],
      providers: [ApirestService], // Provide the service
    });

    apirestService = TestBed.inject(ApirestService); // Inject the service
  });

  it('should be created', () => {
    expect(apirestService).toBeTruthy();
  });
});
