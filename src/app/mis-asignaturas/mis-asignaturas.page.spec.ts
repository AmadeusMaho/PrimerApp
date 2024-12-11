import { MisAsignaturasPage } from './mis-asignaturas.page';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MisAsignaturasPage', () => {
  let component: MisAsignaturasPage;
  let fixture: ComponentFixture<MisAsignaturasPage>;
  let apirestService: ApirestService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MisAsignaturasPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [ApirestService]
    }).compileComponents();

    fixture = TestBed.createComponent(MisAsignaturasPage);
    component = fixture.componentInstance;
    apirestService = TestBed.inject(ApirestService);
    fixture.detectChanges();
  }));
  it('Mostrar información adicional si el usuario no es profesor',() => {
    
    fixture.componentInstance.profesor = false;
    fixture.componentInstance.login = true;
    fixture.detectChanges();

    const profe = document.getElementById("profe")
    const asigProfe = document.getElementById("asigProfe")
    expect(profe).toBeTruthy()

  });
  it('debe mostrar el mensaje "Inicia sesión para ver tus asignaturas" si el usuario no está logueado', () => {
    component.login = false; 
    fixture.detectChanges();
  
    const mensaje = fixture.debugElement.nativeElement.querySelector('.ion-text-center h1');
    expect(mensaje).toBeTruthy();
    expect(mensaje.textContent.trim()).toBe('Inicia sesión para ver tus asignaturas');
  });
 
});
