import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  asignatura: string;

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
      },
    },
  ];

  async guardarAsig(){
    
  }

  constructor() {
    this.asignatura = 'pordefecto';
  }

  
}

