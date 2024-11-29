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

  it('should be created', () => {
    expect(apirestService).toBeTruthy();
  });

  it('recibe la lista de usuarios', () => {
    const mockUsers = [{ id: 1, username: 'Usuario1' }, { id: 2, username: 'Profe1' }];
    
    apirestService.getUsers().then((data: any) => {
      expect(data).toEqual(mockUsers);
    });
  
    const req = httpMock.expectOne('http://localhost:3000/usuarios/');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('recibe usuario por ID', () => {
    const mockUser = { id: 1, username: 'Usuario1' };
    
    apirestService.getUserId('1').then((data: any) => {
      expect(data).toEqual(mockUser);
    });
  
    const req = httpMock.expectOne('http://localhost:3000/usuarios/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('recibe asistencias por ID de usuario', () => {
    const mockAsistencias = [{ id: 1, usuarioId: '1', fecha: '2024-11-28' }];
    
    apirestService.getAsistenciasId('1').then((data: any) => {
      expect(data).toEqual(mockAsistencias);
    });
  
    const req = httpMock.expectOne('http://localhost:3000/asistencias?usuarioId=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockAsistencias);
  });

  it('recibe horario a partir de ID usuario', () => {
    const mockHorario = [{ dia: 'Monday', hora: '9:00 AM', asignatura: 'CS101' }];
    
    apirestService.getHorario('1').then((data: any) => {
      expect(data).toEqual(mockHorario);
    });
  
    const req = httpMock.expectOne('http://localhost:3000/horario?id=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockHorario);
  });

  it('cambia la clave del usuario', () => {
    const mockUser = { id: 1, username: 'Usuario1', password: 'nuevoPass' };
    
    apirestService.modClave('nuevoPass', mockUser).then((data: any) => {
      expect(data).toEqual(mockUser);
    });
  
    const req = httpMock.expectOne('http://localhost:3000/usuarios/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.password).toBe('nuevoPass');
    req.flush(mockUser);
  });
});
