import { ComponentFixture, waitForAsync, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegasistenciaPage } from './regasistencia.page';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
describe('RegasistenciaPage', () => {
  let component: RegasistenciaPage;
  let fixture: ComponentFixture<RegasistenciaPage>;
  let apirestService: ApirestService;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockModalController: jasmine.SpyObj<ModalController>;

  beforeEach(waitForAsync(() => {
    mockModalController = jasmine.createSpyObj('ModalController', ['create']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [RegasistenciaPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [ApirestService,
        { provide: ModalController, useValue: mockModalController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegasistenciaPage);
    component = fixture.componentInstance;
    apirestService = TestBed.inject(ApirestService);
    fixture.detectChanges();
  }));

  it('Agregar asistencia (usuario) a través del botón', fakeAsync( () => {
    fixture.componentInstance.resultadoScan = "TEST041224F";
    component.confirmar();
    document.getElementById("confirmarAsist")?.click();
    fixture.detectChanges();
    tick(2000);
    const error = fixture.componentInstance.error
    expect(error).toBeFalse()
  }));


  it('debe generar un QR correctamente', fakeAsync(() => {
    const asignatura = 'TEST041';
    const seccion = '224F';
    
    component.generarqr(asignatura, seccion);
    tick(1600);
    expect(component.qrData).toEqual(asignatura + seccion);
    expect(component.generado).toBeTrue();
  }));

});
