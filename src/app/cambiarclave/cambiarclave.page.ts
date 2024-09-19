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
  error: boolean = false;
  

  volverMenu(){
    this.router.navigate(['/home']);
  }

  cambiar(){
    if(this.clave.clave1 == this.clave.clave2){
      sessionStorage.setItem('clave', this.clave.clave1 );
      this.router.navigate(['/home']);
    }
    else{
      this.error = true;
    }
  }
}
