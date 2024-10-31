import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import {LensFacing} from '@capacitor-mlkit/barcode-scanning'

@Component({
  selector: 'app-regasistencia',
  templateUrl: './regasistencia.page.html',
  styleUrls: ['./regasistencia.page.scss'],
})
export class RegasistenciaPage implements OnInit {

  constructor(private router:Router, private alertController:AlertController, private modalController: ModalController) { }


resultadoScan = '';
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
    this.resultadoScan = data?.barcode?.displayValue;
  }
}

  seleccionado: boolean = false;
  asign: string = '';



  ngOnInit() {
    const asignatura = sessionStorage.getItem('asignatura')
    this.asign = asignatura !== null ? asignatura : ''; //si asignatura es null entonces asignatura vacío
    console.log(asignatura)
  }

  seccionSeleccionada: string = '';
  generado:boolean=false

  generarqr(asignatura: string,seccion: string ){
    setTimeout( () => {  this.generado = true;
      this.asign = asignatura; this.seccionSeleccionada = seccion;
      console.log(this.asign, this.seccionSeleccionada);
      console.log('QR generado:', this.generado);}, 2200); 
    
  }


  asistencias = [
  {asignatura: 'Proceso de Portafolio', 
    secciones:[
    {seccion: '004D', estado: true},
    {seccion: '006D', estado: true}]
  },
  {asignatura: 'Programación de Base de Datos',   secciones:[
    {seccion: '002D', estado: true},
    {seccion: '001D', estado: true},
    {seccion: '005D', estado: true}]},
  {asignatura: 'Ética para el trabajo', secciones:[
    {seccion: '007D', estado: true},
    {seccion: '002D', estado: true}]},
  {asignatura: 'Estadística', secciones:[
    {seccion: '002D', estado: true},
    {seccion: '001D', estado: true}]},
  {asignatura: 'Programación de aplicaciones móviles', secciones:[
    {seccion: '008D', estado: true},
    {seccion: '004D', estado: true},
    {seccion: '005D', estado: true}]},
  {asignatura: 'Arquitectura', secciones:[
    {seccion: '001D', estado: true},
    {seccion: '002D', estado: true}]},
]



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
