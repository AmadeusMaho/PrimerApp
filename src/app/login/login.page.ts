import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private api:ApirestService) { }

  ngOnInit() {
  }
  
  user: any = {
    username: '',
    password: ''
  }
  
  error: boolean = false;
  loading: boolean = false;
    
  async validar(){
    this.loading = true;
    this.error=false
    let usuario = this.user.username;
    let result: any;
    if(this.user.password=="apiconfig"){
      sessionStorage.setItem('ip', this.user.username.trim());
      window.location.href = window.location.protocol + '//' + window.location.host + '/home';
    }
    else if(this.user.password=="apiremove"){
      sessionStorage.removeItem('ip');
      window.location.href = window.location.protocol + '//' + window.location.host + '/home';
    }
    await this.api.getUser(usuario);
    result = this.api.item;
    console.log(result)
    
    if(result.length == 1 && this.user.username == result[0].username && this.user.password == result[0].password){
      console.log(result[0].id)
      sessionStorage.setItem('login', 'true');
      sessionStorage.setItem('userId', result[0].id);
      sessionStorage.setItem('usuario', result[0].username);
      sessionStorage.setItem('profesor', result[0].profesor);
      sessionStorage.setItem('asignaturas', result[0].asignaturas);
      this.loading = false;
      window.location.href = window.location.protocol + '//' + window.location.host + '/home';
    }   
    else{
      this.loading = false;
      this.error = true;
    }
  }
}