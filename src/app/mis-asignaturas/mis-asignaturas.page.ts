import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-mis-asignaturas',
  templateUrl: './mis-asignaturas.page.html',
  styleUrls: ['./mis-asignaturas.page.scss'],
})
export class MisAsignaturasPage implements OnInit {

fechaActual : string;
mesActual : string;
diaActualText : string;
diaActual : string;
anioActual : number;

siglas:any = [];
asignaturas:any = [];
usuario: string = '';
user: any = [];
profesor:boolean=false;

colores = ["#007bff", "#df26d5", "#90e242", "#e99a40", "#5a19dd", "#d63333"];

  constructor(private api:ApirestService) { 
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
    if (sessionStorage.getItem('profesor') == "true"){
      this.profesor = true;
    }
    this.getAsignaturas()
  }

  colores1(index:number){
    var i :number = index;
    if(i >= this.colores.length){
      i = i-this.colores.length
    }
    var color: string = this.colores[i]
    return color;
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

}
