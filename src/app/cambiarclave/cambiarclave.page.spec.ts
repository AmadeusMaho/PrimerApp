import { CambiarclavePage } from './cambiarclave.page';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

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


  it('Habilitar botón si se llenaron todos los campos', () => {
    fixture.componentInstance.user.password = "nuevaClave";
    fixture.componentInstance.user.password2 = "nuevaClave";
    fixture.componentInstance.user.passwordActual = "Miclav3";
    fixture.componentInstance.login = true;
    
    document.getElementById("btnEnviar")?.click();
    fixture.detectChanges();

    const btnEnviar = document.getElementById("btnEnviar")
    const btnDeshabilitado = document.getElementById("btnDeshabilitado")

    expect(btnEnviar).toBeTruthy();
    expect(btnDeshabilitado).toBeFalsy();
  });

<<<<<<< HEAD

=======
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
>>>>>>> 6bc4a72b29773b8e3747cd43875d361ebe8ef9e9
});