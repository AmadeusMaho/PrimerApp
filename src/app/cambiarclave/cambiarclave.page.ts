import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.page.html',
  styleUrls: ['./cambiarclave.page.scss'],
})
export class CambiarclavePage implements OnInit {
  login: boolean = false;
  constructor(private router:Router, private api:ApirestService) { }
  ngOnInit() {
   
    if(sessionStorage.getItem('login')=='true'){
      this.login = true;
    }
  }

  tempUser : string = 'Usuario1'
  tempPass : string = 'MiClav3'
 

  user: any = {
    password: '',
    password2: '',
    passwordActual: ''
  }
  userId="";
  user1:any=[]

  error: boolean = false;
  exito : boolean = false;
  loading: boolean = false;
  alertButtons = ['Aceptar'];
  
  async enviar(){
    if(sessionStorage.getItem('login')=='true'){
      const usuarioGuardado = sessionStorage.getItem('userId');
      await this.api.getUser(String(sessionStorage.getItem('usuario')));
      let result = this.api.item
      console.log(result[0].password)
      if (usuarioGuardado){
        this.userId = usuarioGuardado;
        console.log(this.userId)
        if(this.user.password.trim()==this.user.password2.trim() && this.user.passwordActual.trim()== result[0].password){
          await this.api.getUserId(this.userId)
          console.log(this.api.item)
          await this.api.modClave(this.user.password.trim(), this.api.item)
          this.exito = true;
          this.error=false;
          this.loading = true;
          sessionStorage.removeItem('usuario');
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('profesor');
          sessionStorage.setItem('login', 'false');
          setTimeout(() => this.router.navigate(['/login']), 4000
          );
          
        }
        else{
          this.exito = false;
          this.error=true;
        }
      }
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