import { CambiarclavePage } from './cambiarclave.page';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CambiarclavePage', () => {
  let component: CambiarclavePage;
  let fixture: ComponentFixture<CambiarclavePage>;
  let apirestService: ApirestService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CambiarclavePage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [ApirestService]
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarclavePage);
    component = fixture.componentInstance;
    apirestService = TestBed.inject(ApirestService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cambiar clave correctamente', fakeAsync(() => {
    sessionStorage.setItem('userId','1');
    component.user.password = 'contraseñaNueva';
    component.user.password2 = 'contraseñaNueva';
    component.user.passwordActual = 'MiClav3';
    component.enviar();
    document.getElementById("btnEnviar")?.click();
    fixture.detectChanges();
    tick();
    const exito = fixture.componentInstance.exito
    expect(exito).toBeTrue;
}))

});