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


resultadoScan: string = '';
fueEscaneado = false;
click = Subscription
fechaActual: string = ""
horaActual: string = ""

// ESCANEO DEL QR, aquí se reciben los datos del QR del profe ///////////////
asignExiste : boolean = false;
asistRegistrada : boolean = false;
error2 : boolean = false;

  seleccionado: boolean = false;
  asign: string = '';
  profesor : boolean = false;
  login : boolean = false;
  
  ngOnInit() {

    this.api.getAsistenciasId(sessionStorage.getItem("userId") ?? '').then((asistencias) => {
      this.userAsistencias = asistencias;
      console.log(this.userAsistencias);
    })
    .catch((error) => {
      console.error('Error al obtener asistencias:', error);
    });


    const asignatura = sessionStorage.getItem('asignatura')
    this.asign = asignatura !== null ? asignatura : ''; //si asignatura es null entonces asignatura vacío
    if (sessionStorage.getItem('profesor') == "true"){
      this.profesor = true;
    }else{
      this.profesor = false;
    }
    this.cargarAsignaturas(this.asignaturas)
    console.log(this.asignaturas)
    console.log(localStorage.getItem('asignSelec')?.substring(1,12))
   
    if(localStorage.getItem('asignSelec')){
      this.generarqr(String(localStorage.getItem('asignSelec')).substring(0,7),String(localStorage.getItem('asignSelec')?.substring(8,12)))
      localStorage.removeItem('asignSelec');
    }


    if(sessionStorage.getItem('login')=='true'){
      this.login = true;
    }

  }


  usuario : any = [];
  asignaturas : any = [];
  siglasRes : any = [];
  seccionesRes : any = [];
  error:boolean=false
  userAsistencias : any = [];



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
      //conseguir fecha actual
    let fechaActual = new Date().toLocaleDateString('es-ES',{
      day:'2-digit',
      month: '2-digit',
      year:'numeric'
    })
    let horaActual = new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    console.log(asignatura,seccion,sessionStorage.getItem('userId') ?? '',fechaActual + ' Hora: ' +horaActual)
    this.api.addAsistencia(asignatura,seccion,sessionStorage.getItem('userId') ?? '',fechaActual + ' Hora: ' +horaActual)
  }

 
  confirmar(){
    if(this.resultadoScan.toString().trim().length>0){
      console.log(this.resultadoScan.toString().trim())
      this.asignExiste = false;
      this.asistRegistrada = false;
      this.error = false;
      this.error2 = false;
      //comprobación si existe asignatura
      for (let asig in this.asignaturas){
        console.log(this.asignaturas[asig].sigla)
        if (this.asignaturas[asig].sigla==this.resultadoScan.substring(0,7)&&
        this.asignaturas[asig].seccion==this.resultadoScan.substring(7,11)){
          console.log("Asignatura existe")
          this.asignExiste = true;
          break;
         }}
         if (!this.asignExiste){
          console.log("Asignatura no existe")
          this.error = true;
         }
         }
        
      //comprobación fecha ( si existe la asistencia ya registrada hoy para no duplicarse)
      for (let asist in this.userAsistencias){
          if (this.userAsistencias[asist].fecha.substring(0,10) == this.fechaActual && 
          this.userAsistencias[asist].sigla == this.resultadoScan.substring(0,7) &&
          this.userAsistencias[asist].seccion == this.resultadoScan.substring(7,11)){
            console.log("asistencia ya registrada hoy")
            this.asistRegistrada = true;
            this.error2 = true;
            console.log(this.userAsistencias[asist].seccion +"="+ this.resultadoScan.substring(7,11))
            console.log(this.userAsistencias[asist].sigla + "=" + this.resultadoScan.substring(0,7))
            console.log(this.userAsistencias[asist].fecha.substring(0,10) +"="+this.fechaActual)
            break;
          }
      }
      if (this.asignExiste == true && this.asistRegistrada == false){
        this.error = false;
        this.error2 = false;
        console.log("INGRESANDO")
        this.api.addAsistencia(this.resultadoScan.substring(0,7),this.resultadoScan.substring(7,11),sessionStorage.getItem('userId') ?? '',
        this.fechaActual + ' Hora: ' +this.horaActual)
        window.location.href = window.location.protocol + '//' + window.location.host + '/mis-asistencias';
      }
         
        }
       
    
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
      console.log(this.resultadoScan.toString().trim())
      this.asignExiste = false;
      this.asistRegistrada = false;
      this.error = false;
      this.error2 = false;
      //comprobación si existe asignatura
      for (let asig in this.asignaturas){
        console.log(this.asignaturas[asig].sigla)
        if (this.asignaturas[asig].sigla==this.resultadoScan.substring(0,7)&&
        this.asignaturas[asig].seccion==this.resultadoScan.substring(7,11)){
          console.log("Asignatura existe")
          this.asignExiste = true;
          break;
         }}
         if (!this.asignExiste){
          console.log("Asignatura no existe")
          this.error = true;
         }
         
        
      //comprobación fecha ( si existe la asistencia ya registrada hoy para no duplicarse)
      for (let asist in this.userAsistencias){
          if (this.userAsistencias[asist].fecha.substring(0,10) == this.fechaActual && 
          this.userAsistencias[asist].sigla == this.resultadoScan.substring(0,7) &&
          this.userAsistencias[asist].seccion == this.resultadoScan.substring(7,11)){
            console.log("asistencia ya registrada hoy")
            this.asistRegistrada = true;
            this.error2 = true;
            console.log(this.userAsistencias[asist].seccion +"="+ this.resultadoScan.substring(7,11))
            console.log(this.userAsistencias[asist].sigla + "=" + this.resultadoScan.substring(0,7))
            console.log(this.userAsistencias[asist].fecha.substring(0,10) +"="+this.fechaActual)
            break;
          }
      }
      if (this.asignExiste == true && this.asistRegistrada == false){
        this.error = false;
        this.error2 = false;
        console.log("INGRESANDO")
        this.api.addAsistencia(this.resultadoScan.substring(0,7),this.resultadoScan.substring(7,11),sessionStorage.getItem('userId') ?? '',
        this.fechaActual + ' Hora: ' +this.horaActual)
        window.location.href = window.location.protocol + '//' + window.location.host + '/mis-asistencias';
      }
      
    }
    else{
      this.fueEscaneado = false;
    }
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


}
