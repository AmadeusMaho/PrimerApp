import { HomePage } from './home.page';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
      providers: [ApirestService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    apirestService = TestBed.inject(ApirestService);
    fixture.detectChanges();
  }));

  it('Debe guardar asignatura en el session storage para mostrar al usuario', () => {
    const asignatura = 'ASIG123';
    component.almAsign(asignatura);
    expect(sessionStorage.getItem('asignatura')).toBe(asignatura);
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
