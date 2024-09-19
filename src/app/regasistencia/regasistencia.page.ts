import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regasistencia',
  templateUrl: './regasistencia.page.html',
  styleUrls: ['./regasistencia.page.scss'],
})
export class RegasistenciaPage implements OnInit {

  constructor() { }

  asign: string = '';
  ngOnInit() {
    const asignatura = sessionStorage.getItem('asignatura')
    this.asign = asignatura !== null ? asignatura : ''; //si asignatura es null entonces asignatura vacío
    console.log(asignatura)
  }

  generado:boolean=false
  generarqr(){
    this.generado = true;
    console.log('QR generado:', this.generado);
  }
}
