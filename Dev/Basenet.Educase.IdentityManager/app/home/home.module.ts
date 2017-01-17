import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        HomeRoutingModule
    ],
    declarations: [HomeComponent],
    bootstrap: [HomeComponent]
})

export class HomeModule { }