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
        this.router.navigate(['/login']);
      },
    },
  ];



  constructor(private router:Router, private route: ActivatedRoute) {
  }

ngOnInit(){
  const usuarioGuardado = sessionStorage.getItem('usuario');
  if (usuarioGuardado){
    this.usuario = usuarioGuardado;
  }
  
}
}

