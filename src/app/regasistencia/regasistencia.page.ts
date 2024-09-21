import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-regasistencia',
  templateUrl: './regasistencia.page.html',
  styleUrls: ['./regasistencia.page.scss'],
})
export class RegasistenciaPage implements OnInit {

  constructor(private router:Router, private alertController:AlertController) { }

  seleccionado: boolean = false;
  asign: string = '';
  ngOnInit() {
    const asignatura = sessionStorage.getItem('asignatura')
    this.asign = asignatura !== null ? asignatura : ''; //si asignatura es null entonces asignatura vacío
    console.log(asignatura)
  }

  generado:boolean=false
  generarqr(){
    this.generado = true;
    console.log('QR generado:', this.generado);
  }


  asistencias = [
  {asignatura: 'Proceso de Portafolio', seccion: '004D', estado: true},
  {asignatura: 'Programación de Base de Datos', lastAttendance: '12-09-2024', estado: false},
  {asignatura: 'Ética para el trabajo', lastAttendance: '07-09-2024', estado: true},
  {asignatura: 'Estadística', lastAttendance: '19-09-2024', estado: true},
  {asignatura: 'Programación de aplicaciones móviles', lastAttendance: '06-09-2024', estado: true},
  {asignatura: 'Arquitectura', lastAttendance: '07-09-2024', estado: false}
]



async mostrarAlerta(asignatura: string) {
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

}
