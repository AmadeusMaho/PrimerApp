import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-asignaturas',
  templateUrl: './mis-asignaturas.page.html',
  styleUrls: ['./mis-asignaturas.page.scss'],
})
export class MisAsignaturasPage implements OnInit {
  asignaturas = [
    {sigla: 'APY4461', asignatura: 'Proceso de Portafolio', seccion:'001D'},
    {sigla: 'MDY3131', asignatura: 'Programación de Base de Datos', seccion:'004D'},
    {sigla: 'EAY4450', asignatura: 'Ética para el trabajo', seccion:'006D'},
    {sigla: 'MAT4140', asignatura: 'Estadística', seccion:'001D'},
    {sigla: 'PGY4121', asignatura: 'Programación de aplicaciones móviles', seccion:'004D'},
    {sigla: 'ASY4131', asignatura: 'Arquitectura', seccion:'004D'}
  ];

  colores = ["#007bff", "#df26d5", "#90e242", "#e99a40", "#5a19dd", "#d63333"];

  constructor() { }

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
