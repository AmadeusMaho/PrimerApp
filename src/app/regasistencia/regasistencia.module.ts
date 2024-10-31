import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegasistenciaPageRoutingModule } from './regasistencia-routing.module';

import { RegasistenciaPage } from './regasistencia.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RegasistenciaPageRoutingModule
  ],
  declarations: [RegasistenciaPage]
})
export class RegasistenciaPageModule {}
