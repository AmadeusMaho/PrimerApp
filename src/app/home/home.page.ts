import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApirestService } from '../apirest.service';

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
        this.router.navigate(['/login']);
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
  this.getHorario()
}

asignaturas:any=[]
colores = ["#007bff", "#df26d5", "#90e242", "#e99a40", "#5a19dd", "#d63333"];
asignatura_1 : string = 'Arquitectura'
asignatura_2 : string = 'Estadística'
asignatura_3 : string = 'Programación de aplicaciones móviles'
asignatura_4 : string = 'Programación de Base de Datos'

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
  console.log(this.userId)
  await this.api.getHorario(this.userId)
  this.horario = this.api.item[0];
  console.log(this.horario);
  for (let i in this.horario.clases){
    console.log(this.horario.clases[i])
    if(this.horario.clases[i].dias.includes(this.diaActualText)){
      let index = this.horario.clases[i].dias.indexOf(this.diaActualText);
      await this.api.getAsignaturasSigla(this.horario.clases[i].sigla);
      let nombre = this.api.item[0].asignatura;
      let hoy = [this.horario.clases[i].sigla, nombre, this.horario.clases[i].hora[index]]
      this.horarioDia.push(hoy);
      console.log(this.horarioDia)
    }
  }
}
}

