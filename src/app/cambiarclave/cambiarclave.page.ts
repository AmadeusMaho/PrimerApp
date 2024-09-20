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
    if(sessionStorage.getItem('login')=='true'){
      this.login=true
    }
    else{
      this.login=false
    }
  }
  clave: any = {
    clave1: '',
    clave2: ''
  }  

  user: any = {
    username: ''
  }

  error: boolean = false;
  exito : boolean = false;
    
  enviar(){
    console.log(sessionStorage.getItem('usuario'))
    if(this.user.username.trim() == sessionStorage.getItem('usuario')){
      this.exito = true;
      this.error=false;
      console.log(sessionStorage.getItem('usuario'))
    }
  }

  volverClave(){
    if (sessionStorage.getItem('password')){
      this.router.navigate((['/home']))
    }
    else{
      this.router.navigate((['/login']))
    }
  }
}