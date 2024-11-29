import { HomePage } from './home.page';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apirestService: ApirestService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [ApirestService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    apirestService = TestBed.inject(ApirestService);
    fixture.detectChanges();
  }));

  it('Debe guardar asignatura en el session storage para mostrar al usuario (almasign())', () => {
    const asignatura = 'ASIG123';
    component.almAsign(asignatura);
    expect(sessionStorage.getItem('asignatura')).toBe(asignatura);
  });

  it('debe cerrar sesión del usuario y borrar el local Storage', () => {
    sessionStorage.setItem('usuario', 'Pedrito Enrique');
    sessionStorage.setItem('userId', '12345');
    sessionStorage.setItem('login', 'true');
  
    component.alertButtons[1].handler();
  
    expect(sessionStorage.getItem('usuario')).toBeNull();
    expect(sessionStorage.getItem('userId')).toBeNull();
    expect(sessionStorage.getItem('login')).toBe('false');
  });

  it('al hacer click desde home debe guardar la asignatura y el nombre para crear QR en Regasistencia', () => {
    const asignatura = 'TEST041';
    const nombre = 'Matemáticas';
    component.marcarAsign(asignatura, nombre);
    expect(localStorage.getItem('asignSelec')).toBe(asignatura);
  });

  it('carga el usuario al loguearse', () => {
    sessionStorage.setItem('login', 'true');
    sessionStorage.setItem('usuario', 'Oppen Heimer');
    sessionStorage.setItem('profesor', 'true');
    
    component.ngOnInit();
    
    expect(component.usuario).toBe('Oppen Heimer');
    expect(component.profesor).toBe(true);

  });
  it('Mostrar contenido distinto si el usuario no ha iniciado sesión',() => {
    
    fixture.componentInstance.login = false;
    fixture.detectChanges();

    const navbarLogin = document.getElementById("navbarLogin")
    const navbar = document.getElementById("navbar")
    const saludo = document.getElementById("saludo")
    const horario = document.getElementById("horario")
    expect(navbar).toBeTruthy()
    expect(navbarLogin).toBeFalsy()
    expect(saludo).toBeFalsy()
    expect(horario).toBeFalsy()
  });
});

