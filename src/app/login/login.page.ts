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
  
  tempUser = 'Usuario1';
  tempPass = 'MiClav3';
  error: boolean = false;
    validar(){
    if(this.user.username == this.tempUser && this.user.password == this.tempPass){
      sessionStorage.setItem('usuario', this.user.username);
      sessionStorage.setItem('password', this.user.password);
      this.router.navigate(['/home']);
      this.error=false
    }
    else{
      this.error = true;
    }
  }
}