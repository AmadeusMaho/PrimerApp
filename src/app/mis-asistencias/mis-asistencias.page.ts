import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.page.html',
  styleUrls: ['./mis-asistencias.page.scss'],
})
export class MisAsistenciasPage implements OnInit {

asignatura_1 : string = 'Arquitectura'
asignatura_2 : string = 'Estadística'
asignatura_3 : string = 'Programación de aplicaciones móviles'
asignatura_4 : string = 'Programación de Base de Datos'
asignatura_5 : string = 'Proceso de Portafolio'
asignatura_6 : string = 'Ética para el trabajo'

fechaActual : string;
mesActual : string;
diaActualText : string;
diaActual : string;
anioActual : number;

colores = ["#007bff", "#df26d5", "#90e242", "#e99a40", "#5a19dd", "#d63333"];

asistencias = [
  {asignatura: 'Proceso de Portafolio', lastAttendance: '14-09-2024', estado: true},
  {asignatura: 'Programación de Base de Datos', lastAttendance: '12-09-2024', estado: false},
  {asignatura: 'Ética para el trabajo', lastAttendance: '07-09-2024', estado: true},
  {asignatura: 'Programación de Base de Datos', lastAttendance: '05-09-2024', estado: true},
  {asignatura: 'Estadística', lastAttendance: '19-09-2024', estado: true},
  {asignatura: 'Programación de aplicaciones móviles', lastAttendance: '06-09-2024', estado: true},
  {asignatura: 'Arquitectura', lastAttendance: '07-09-2024', estado: false},
  {asignatura: 'Proceso de Portafolio', lastAttendance: '12-08-2024', estado: false}

];
  constructor() { 
  this.fechaActual = new Date().toLocaleDateString('es-ES',{
    day:'2-digit',
    month: '2-digit',
    year:'numeric'
  })
  this.anioActual = new Date().getFullYear();
  this.diaActual = new Date().toLocaleDateString('es-ES',{
    day:'2-digit'
  })
  this.mesActual = new Date().toLocaleDateString('es-ES', { month: 'long'});
  this.diaActualText = new Date().toLocaleDateString('es-ES', { weekday: 'long'});
}
  ngOnInit() {
  }
  colores1(index:number){
      var i :number = index;
      if(i >= this.colores.length){
        i = i-this.colores.length
      }
      var color: string = this.colores[i]
      return color;
  }
}
