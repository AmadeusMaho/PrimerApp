import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.page.html',
  styleUrls: ['./cambiarclave.page.scss'],
})
export class CambiarclavePage implements OnInit {
  login: boolean = false;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  tempUser : string = 'Usuario1'
  tempPass : string = 'MiClav3'

  user: any = {
    username: '',
    password: ''
  }

  error: boolean = false;
  exito : boolean = false;
  alertButtons = ['Aceptar'];
  
  enviar(){
    if(!sessionStorage.getItem('usuario')){
      console.log("usuario no existe")
      sessionStorage.setItem('usuario', this.tempUser);
      sessionStorage.setItem('password', this.tempPass);
    }
    console.log(sessionStorage.getItem('usuario'))
    if(this.user.username.trim() == sessionStorage.getItem('usuario')){
      this.exito = true;
      this.error=false;
      console.log(sessionStorage.getItem('usuario'))
    }
    else{
      this.error = true;
    }
  }

  volverClave(){
    if (sessionStorage.getItem('login')=='true'){
      this.router.navigate((['/home']))
      this.exito = false;
    }
    else{
      this.router.navigate((['/login']))
    }
  }
}