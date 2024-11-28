
import { MisAsistenciasPage } from './mis-asistencias.page';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MisAsistenciasPage', () => {
  let component: MisAsistenciasPage;
  let fixture: ComponentFixture<MisAsistenciasPage>;
  let apirestService: ApirestService;

  beforeEach(waitForAsync(() => {
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
