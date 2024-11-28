import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let apirestService: ApirestService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [ApirestService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    apirestService = TestBed.inject(ApirestService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login funciona', fakeAsync( () => {
    fixture.componentInstance.user.username = "Usuario1";
    fixture.componentInstance.user.password = "MiClav3";

    document.getElementById("btnValidar")?.click();
    fixture.detectChanges();
    tick();

    const error = fixture.componentInstance.error
    expect(error).toBeFalse()
  }));

  it('Deshabilitar login si no se ha ingresado una clave', () => {
    fixture.componentInstance.user.username = "Usuario1";
    fixture.componentInstance.user.password = "";

    document.getElementById("btnValidar")?.click();
    fixture.detectChanges();

    const btnValidar = document.getElementById("btnValidar")
    const btnDeshabilitado = document.getElementById("btnDeshabilitado")
    expect(btnValidar).toBeFalsy()
    expect(btnDeshabilitado).toBeTruthy()

  });

  it('Deshabilitar login si no se ha ingresado un usuario', () => {
    fixture.componentInstance.user.username = "";
    fixture.componentInstance.user.password = "MiClav3";

    document.getElementById("btnValidar")?.click();
    fixture.detectChanges();

    const btnValidar = document.getElementById("btnValidar")
    const btnDeshabilitado = document.getElementById("btnDeshabilitado")
    expect(btnValidar).toBeFalsy()
    expect(btnDeshabilitado).toBeTruthy()

  });
});