import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.page.html',
  styleUrls: ['./cambiarclave.page.scss'],
})
export class CambiarclavePage implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }
  

  user: any = {
    username: '',
    password: ''
  }
  
  
  tempUser = 'Usuario1';
  tempPass = 'MiClav3';
  error: boolean = false;
  exito : boolean = false;
    enviar(){
    if(this.user.username == this.tempUser){
      this.exito = true;
      this.error=false
    }
    else{
      this.error = true;
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