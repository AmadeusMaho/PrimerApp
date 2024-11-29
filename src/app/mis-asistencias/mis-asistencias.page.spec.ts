
import { MisAsistenciasPage } from './mis-asistencias.page';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('MisAsistenciasPage', () => {
  let component: MisAsistenciasPage;
  let fixture: ComponentFixture<MisAsistenciasPage>;
  let apirestService: ApirestService;
  let mockApi: jasmine.SpyObj<ApirestService>;
  

  beforeEach(waitForAsync(() => {

    mockApi = jasmine.createSpyObj('ApirestService', ['getAsistenciasId']);
    TestBed.configureTestingModule({
      declarations: [MisAsistenciasPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [ApirestService]
    }).compileComponents();

    fixture = TestBed.createComponent(MisAsistenciasPage);
    component = fixture.componentInstance;
    apirestService = TestBed.inject(ApirestService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
