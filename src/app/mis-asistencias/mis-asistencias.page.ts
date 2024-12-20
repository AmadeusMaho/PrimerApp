import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.page.html',
  styleUrls: ['./mis-asistencias.page.scss'],
})
export class MisAsistenciasPage implements OnInit {

asistenciasUsuario : any = [];
fechaActual : string;
mesActual : string;
diaActualText : string;
diaActual : string;
anioActual : number;
profesor: boolean = false;
colores = ["#007bff", "#df26d5", "#90e242", "#e99a40", "#5a19dd", "#d63333"];

siglas:any = [];
asignaturas:any = [];
usuario: string = '';
user: any = [];
titulo: string = 'Mis asistencias';
userId: string = '';

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
login : boolean = false;
  ngOnInit() {
    if (sessionStorage.getItem('profesor') == "true"){
      this.profesor = true;
      this.titulo = "Clases registradas"
    }
    
    this.getAsignaturas()
    this.getAsistencias()
        
  if(sessionStorage.getItem('login')=='true'){
    this.login = true;
  }

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
    return asistencias.filter(a => a.sigla+'-'+a.seccion == sigla);
  }
  async getAsignaturas(){
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if(usuarioGuardado){
      this.usuario = usuarioGuardado
    }
    await this.api.getUser(this.usuario)
    this.user = this.api.item[0];
    this.siglas = this.user.asignaturas
    for (let i in this.siglas){
      await this.api.getAsignaturasSigla(this.siglas[i])
      this.asignaturas.push(this.api.item[0])
    }
  }

  async getAsistencias(){
    const id = sessionStorage.getItem('userId');
    if(id){
      this.userId = id
    }
    await this.api.getAsistenciasId(this.userId)
    this.asistenciasUsuario = this.api.listado
    console.log(this.asistenciasUsuario)
  }
  
}