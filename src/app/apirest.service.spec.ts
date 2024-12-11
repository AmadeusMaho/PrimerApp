import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApirestService } from './apirest.service';

describe('ApirestService', () => {
  let apirestService: ApirestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
      ],
      providers: [ApirestService], 
    });
    apirestService = TestBed.inject(ApirestService); 
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('Debe conectarse a la API y recibir usuarios', () => {
    //método de ejemplo getUsers()
    const mockUsers = [{ id: 1, username: 'Usuario1' }, { id: 2, username: 'Profe1' }];
    apirestService.getUsers().then((data: any) => {
      expect(data).toEqual(mockUsers);
    });
    const req = httpMock.expectOne('http://localhost:3000/usuarios/');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
