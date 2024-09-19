import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tempUser : string = 'Usuario1'
  tempPass : string = 'MiClav3'
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
        sessionStorage.setItem('login', 'false');
        this.router.navigate(['/login']);
      },
    },
  ];



  constructor(private router:Router, private route: ActivatedRoute) {
  }

ngOnInit(){
  const usuarioGuardado = sessionStorage.getItem('usuario');
  if (usuarioGuardado&&sessionStorage.getItem('login')!='false'){
    this.usuario = usuarioGuardado;
    sessionStorage.setItem('login', 'true')
  }
  else if(sessionStorage.getItem('usuario')==''){
    sessionStorage.setItem('usuario', this.tempUser);
    sessionStorage.setItem('clave', this.tempPass);
    sessionStorage.setItem('login', 'true');
  }
  if( sessionStorage.getItem('login')=='true'){
    this.login = true;
  }
  else{
    this.login = false;
  }

  
}
}

