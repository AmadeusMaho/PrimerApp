import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApirestService } from '../apirest.service';
import { RegasistenciaPage } from '../regasistencia/regasistencia.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  userId: string = '';
  login: boolean = false;
  horario: any = []
  horarioDia: any = []
  diaActualText: string = ""
  saludo:string="Bienvenido, ";
  imgUrl:string="";
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Cerrar sesión cancelado');
      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        console.log('Sesión cerrada');
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('profesor');
        sessionStorage.setItem('login', 'false');
        this.router.navigate(['/login'])
      },
    },
  ];



  constructor(private router:Router, private route: ActivatedRoute, private api:ApirestService) {
    this.diaActualText = new Date().toLocaleDateString('en-US', { weekday: 'short'});
  }

  profesor: boolean = false;
ngOnInit(){
  if(sessionStorage.getItem('login')=='true'){
    this.login = true;
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado){
      this.usuario = usuarioGuardado;
      if (sessionStorage.getItem('profesor') == "true"){
        this.profesor = true;
      }
      else{
        this.profesor = false;}   
    }
  }
  let darkmode = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkmode.matches){
    this.imgUrl="../../assets/img/duoc-dark.png"
  }
  else{
    this.imgUrl="../../assets/img/duoc-light.png"
  }
  this.getSaludo()
  this.getHorario()
}

marcarAsign(){

}
asignaturas:any=[]
colores = ["#007bff", "#df26d5", "#90e242", "#e99a40", "#5a19dd", "#d63333"];

asign: string = '';
almAsign(asignatura : string){
  this.asign = asignatura;
  sessionStorage.setItem('asignatura', this.asign);
  console.log(sessionStorage.getItem('asignatura'))
  this.router.navigate((['/regasistencia']))
}

colores1(index:number){
  var i :number = index;
  if(i >= this.colores.length){
    i = i-this.colores.length
  }
  var color: string = this.colores[i]
  return color;
}

async getHorario(){
  const usuarioId = sessionStorage.getItem('userId');
  if(usuarioId){
    this.userId = usuarioId
  }
  await this.api.getHorario(this.userId)
  this.horario = this.api.item[0];
  for (let i in this.horario.clases){
    if(this.horario.clases[i].dias.includes(this.diaActualText)){
      let index = this.horario.clases[i].dias.indexOf(this.diaActualText);
      await this.api.getAsignaturasSigla(this.horario.clases[i].sigla);
      let nombre = this.api.item[0].asignatura;
      let hoy = [this.horario.clases[i].sigla, nombre, this.horario.clases[i].hora[index]]
      this.horarioDia.push(hoy);
    }
  }
}

getSaludo(){
  let date = new Date()
  var hora = date.getHours()
  if (hora<12&&hora>=6){
    this.saludo="Buenos días, "
  }
  else if (hora>=12&&hora<20){
    this.saludo="Buenas tardes, "
  }
  else if (hora>=20&&hora<6){
    this.saludo="Buenas noches, "
  }
}
}