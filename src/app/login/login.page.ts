import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  

  user: any = {
    username: '',
    password: ''
  }
  
  error: boolean = false;
    validar(){
    if(this.user.username == sessionStorage.getItem('usuario') && this.user.password == sessionStorage.getItem('clave')){
      this.router.navigate(['/home']);
      sessionStorage.setItem('login', 'true');
    }
    else{
      this.error = true;
    }
  }
}