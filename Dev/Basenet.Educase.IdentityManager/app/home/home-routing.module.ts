import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

@NgModule({
  exports: [
    RouterModule
  ]
})

export class HomeRoutingModule {}