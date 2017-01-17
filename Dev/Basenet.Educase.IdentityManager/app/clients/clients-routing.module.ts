import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../common/auth.guard';

import { ClientsComponent } from './clients.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientService } from './client.service';
import { PageNotFoundComponent } from '../common/error-pages/pagenotfound.component';

@NgModule({
  providers: [
    ClientService
  ]

})

export class ClientRoutingModule {}