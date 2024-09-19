import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiarclave',
  templateUrl: './cambiarclave.page.html',
  styleUrls: ['./cambiarclave.page.scss'],
})
export class CambiarclavePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  volverMenu(){
    this.router.navigate(['/home']);
  }
}
