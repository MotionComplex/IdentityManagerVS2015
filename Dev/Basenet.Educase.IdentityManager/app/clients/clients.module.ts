import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

import { ClientsComponent } from './clients.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

import { ClientService } from './client.service';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        ClientsComponent,
        ClientDetailComponent
    ],
    providers: [
        ClientService
    ],
    bootstrap: [
        ClientsComponent
    ]
})

export class ClientsModule { }