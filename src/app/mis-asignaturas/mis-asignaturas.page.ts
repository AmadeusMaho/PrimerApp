import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-mis-asignaturas',
  templateUrl: './mis-asignaturas.page.html',
  styleUrls: ['./mis-asignaturas.page.scss'],
})
export class MisAsignaturasPage implements OnInit {

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

asignaturas = [
  {asignatura: 'Proceso de Portafolio', profesor: 'Victor Bazel', seccion: '006D'},
  {asignatura: 'Programación de Base de Datos', profesor: 'Hoffman Garuda', seccion: '004D'},
  {asignatura: 'Ética para el trabajo', profesor: 'Robert Geuse', seccion: '001D'},
  {asignatura: 'Estadística', profesor: 'Enrique Stygian', seccion: '004D'},
  {asignatura: 'Programación de aplicaciones móviles', profesor: 'Patricio Yañez', seccion: '004D'},
  {asignatura: 'Arquitectura', profesor: 'José Luis Pino', seccion: '004D'},
]
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
