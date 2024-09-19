import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  

  ngOnInit() {
  }
  userInput=''
  passwordInput=''
  error=false

  validar(){
    if (this.userInput.trim()!='' && this.passwordInput.trim()!=''){
      this.error=false;
    }
    else{
      this.error=true;
    }
  }

}
