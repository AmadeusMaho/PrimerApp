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
  tempUser : string = 'Usuario1'
  tempPass : string = 'MiClav3'

  user: any = {
    username: '',
    password: ''
  }
  
  error: boolean = false;
  loading: boolean = false;
    
  async validar(){
    let usuario = this.user.username;
    let result: any;
    this.loading = true;
    await this.api.getUser(usuario);
    result = this.api.item;
    console.log(result)
    if(result.length == 1 && this.user.username == result[0].username && this.user.password == result[0].password){
      this.error=false
      console.log(result[0].id)
      sessionStorage.setItem('login', 'true');
      sessionStorage.setItem('userId', result[0].id);
      sessionStorage.setItem('usuario', result[0].username);
      sessionStorage.setItem('profesor', result[0].profesor);
      this.loading = false;
      this.router.navigate(['/home']);
    }   
    else{
      this.loading = false;
      this.error = true;
    }
  }
}