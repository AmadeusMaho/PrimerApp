import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  login: boolean = false;
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
        this.login = false;
        this.router.navigate(['/login']);
      },
    },
  ];



  constructor(private router:Router, private route: ActivatedRoute) {
  }

  profesor: boolean = false;
ngOnInit(){
  const usuarioGuardado = sessionStorage.getItem('usuario');
  if (usuarioGuardado){
    this.usuario = usuarioGuardado;
    this.login = true;
    if (sessionStorage.getItem('profesor') == "true"){
      this.profesor = true;
    }else{
      this.profesor = false;
    }
  }
  
}
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
}

