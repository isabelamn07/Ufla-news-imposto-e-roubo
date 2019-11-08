import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BoletimDetailsPage } from './boletim-details.page';

const routes: Routes = [
  {
    path: '',
    component: BoletimDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BoletimDetailsPage]
})
export class BoletimDetailsPageModule {}
