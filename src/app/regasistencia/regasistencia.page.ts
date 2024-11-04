import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import {LensFacing} from '@capacitor-mlkit/barcode-scanning'
import { HttpClient } from '@angular/common/http';
import { ApirestService } from '../apirest.service';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-regasistencia',
  templateUrl: './regasistencia.page.html',
  styleUrls: ['./regasistencia.page.scss'],
})
export class RegasistenciaPage implements OnInit {

  constructor(private api:ApirestService, private router:Router, private alertController:AlertController, private modalController: ModalController, private http: HttpClient, private activatedRoute:ActivatedRoute) { }


resultadoScan = '';
fueEscaneado = false;
click = Subscription
fechaActual: string = ""
horaActual: string = ""

// ESCANEO DEL QR, aquí se reciben los datos del QR del profe ///////////////
async escanear() {
  const modal = await this.modalController.create({
  component: BarcodeScanningModalComponent,
  showBackdrop: false,
  cssClass: 'barcode-scanning-modal',
  componentProps: { formats: [],
    lensFacing: LensFacing.Back
   }
  });

  await modal.present();

  const {data} = await modal.onWillDismiss();
  if (data){

    //conseguir fecha actual
    this.fechaActual = new Date().toLocaleDateString('es-ES',{
      day:'2-digit',
      month: '2-digit',
      year:'numeric'
    })
    this.horaActual = new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    this.resultadoScan = data?.barcode?.displayValue;
    this.fueEscaneado = true;
  }
  else{
    this.fueEscaneado = false;
  }
}

  seleccionado: boolean = false;
  asign: string = '';
  profesor : boolean = false;

  ngOnInit() {
    const asignatura = sessionStorage.getItem('asignatura')
    this.asign = asignatura !== null ? asignatura : ''; //si asignatura es null entonces asignatura vacío
    if (sessionStorage.getItem('profesor') == "true"){
      this.profesor = true;
    }else{
      this.profesor = false;
    }
    this.cargarAsignaturas(this.asignaturas)
    console.log(localStorage.getItem('asignSelec')?.substring(1,12))
   
    if(localStorage.getItem('asignSelec')){
      this.generarqr(String(localStorage.getItem('asignSelec')).substring(0,7),String(localStorage.getItem('asignSelec')?.substring(8,12)))
      localStorage.removeItem('asignSelec');
    }
  }

  usuario : any = [];
  asignaturas : any = [];
  siglasRes : any = [];
  seccionesRes : any = [];



  seccionSeleccionada: string = '';
  generado:boolean=false


  // GENERAR QR, asigna la información elegida por el profesor y genera el QR para el escaneo //////////////////////////////////
qrData : any = "";
  generarqr(asignatura: string,seccion: string ){
    setTimeout( () => {  this.generado = true;
      this.asign = asignatura; this.seccionSeleccionada = seccion;
      this.qrData = this.asign+this.seccionSeleccionada;
      console.log(this.asign, this.seccionSeleccionada);
      console.log('QR generado:', this.generado);}, 1600); 
  }

  confirmar(){
    this.api.addAsistencia(this.resultadoScan.substring(0,7),this.resultadoScan.substring(7,11),sessionStorage.getItem('userId') ?? '',this.fechaActual + ' Hora: ' +this.horaActual)
    this.router.navigate(['/mis-asistencias'])
  }


  async cargarAsignaturas(asignaturas: Array<any>) {
    try {
      this.usuario = await this.api.getUserId(String(sessionStorage.getItem('userId')));
      this.usuario.asignaturas.forEach((asignatura: string) => {
        const [sigla, seccion] = asignatura.split('-'); 
        asignaturas.push(({sigla, seccion}));
      });
      console.log(this.asignaturas);
    } catch (error) {
      console.log('Error al cargar las asignaturas:', error);
    }
  }

  



/* async mostrarAlerta(asignatura: string) {
  const alert = await this.alertController.create({
    header: 'Selecciona la sección para ' + asignatura,
    buttons:  [
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: () => {
          console.log('Generación cancelada');
        }
      },
      {
        text: 'Aceptar',
        role: 'aceptar',
        handler: () => {
          sessionStorage.setItem('asignatura', this.asign);
          console.log(sessionStorage.getItem('asignatura'));
          this.generado = true;
          this.generarqr(); 
        }
      }
    ]
  });
  this.asign = asignatura;
  sessionStorage.setItem('asignatura', this.asign);
  console.log(sessionStorage.getItem('asignatura'));

  await alert.present();






  this.http.get<any[]>('http://localhost:3000/usuarios').subscribe(
      (data: any[]) => {
        this.usuario = this.api.getUserId(String(sessionStorage.getItem('userId')));
        console.log(this.usuario)
        console.log(this.usuario.asignaturas)

        this.usuario.asignaturas.forEach((asignaturas: string) => {
          this.asignaturasProfe.push(asignaturas);
          console.log(this.asignaturas);
      });
        
      },
      (error) => {
        console.log('error al obtener el listado de usuarios', error);
      }
    )
} */

botonVolver(){
  this.router.navigate(['/home'])
  this.generado = false;
}

async volverQR(){
const volverQRAlerta = await this.alertController.create({
  header:'Volver al menú',
  message:'Al volver se eliminará el QR. ¿Confirmar?',
  buttons: [
    {
      text:'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('se queda');
      }
    },
    {
      text: 'Confirmar',
      handler: () => {
        this.generado = false;
        console.log('volviendo al menú')
      }
    }
  ]


});
await volverQRAlerta.present();
}

public alertBotonAceptar = ['OK'];
private values: string[] = ['first', 'second', 'third'];
accordionGroupChange = (ev: any) => {
  const collapsedItems = this.values.filter((value) => value !== ev.detail.value);
  const selectedValue = ev.detail.value;

  console.log(
    `Expanded: ${selectedValue === undefined ? 'None' : ev.detail.value} | Collapsed: ${collapsedItems.join(', ')}`
  );
};


usuarios : any = [];


secciones=[
  {asignatura: 'Proceso de Portafolio', secciones:[
    { seccion: '006D', estado: true},
    { seccion: '007D', estado: true},
  ], estado: true},
  {asignatura: 'Programación de Base de Datos', secciones:[
    { seccion: '004D', estado: true},
    { seccion: '002D', estado: true},
    { seccion: '001D', estado: true},
  ], estado: true},
]


}
