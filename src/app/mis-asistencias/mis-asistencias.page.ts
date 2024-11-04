import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.page.html',
  styleUrls: ['./mis-asistencias.page.scss'],
})
export class MisAsistenciasPage implements OnInit {

  asistenciasUsuario : any = [];


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
  {sigla: 'APY4461', asignatura: 'Proceso de Portafolio', lastAttendance: '14-09-2024', estado: true},
  {sigla: 'MDY3131', asignatura: 'Programación de Base de Datos', lastAttendance: '12-09-2024', estado: false},
  {sigla: 'EAY4450', asignatura: 'Ética para el trabajo', lastAttendance: '07-09-2024', estado: true},
  {sigla: 'MDY3131', asignatura: 'Programación de Base de Datos', lastAttendance: '05-09-2024', estado: true},
  {sigla: 'MAT4140', asignatura: 'Estadística', lastAttendance: '19-09-2024', estado: true},
  {sigla: 'PGY4121', asignatura: 'Programación de aplicaciones móviles', lastAttendance: '06-09-2024', estado: true},
  {sigla: 'ASY4131', asignatura: 'Arquitectura', lastAttendance: '07-09-2024', estado: false},
  {sigla: 'APY4461', asignatura: 'Proceso de Portafolio', lastAttendance: '12-08-2024', estado: false}

];

asignaturas = [
  {sigla: 'APY4461', asignatura: 'Proceso de Portafolio'},
  {sigla: 'MDY3131', asignatura: 'Programación de Base de Datos'},
  {sigla: 'EAY4450', asignatura: 'Ética para el trabajo'},
  {sigla: 'MAT4140', asignatura: 'Estadística'},
  {sigla: 'PGY4121', asignatura: 'Programación de aplicaciones móviles'},
  {sigla: 'ASY4131', asignatura: 'Arquitectura'}
];

  constructor(private api: ApirestService) { 
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

    this.asistenciasUsuario = this.api.getAsistenciasId(String(sessionStorage.getItem("usuarioId")))
    console.log(this.asistenciasUsuario)
    
  this.api.getAsistenciasId(String(sessionStorage.getItem("usuarioId"))).subscribe(
    (data: any) => {
      this.asistenciasUsuario = data;
      console.log("Datos de asistencia:", this.asistenciasUsuario);
    },
    (error) => {
      console.error("Error en la comunicación con la API", error);
    }
  );


  }
  colores1(index:number){
      var i :number = index;
      if(i >= this.colores.length){
        i = i-this.colores.length
      }
      var color: string = this.colores[i]
      return color;
  }
  filtroAsignaturas(asistencias: any[], sigla:string): any[] {
    return asistencias.filter(a => a.sigla == sigla);
  }
}
