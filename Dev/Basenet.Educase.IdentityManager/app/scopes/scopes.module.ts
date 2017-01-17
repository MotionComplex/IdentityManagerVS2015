import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ScopesComponent } from './scopes.component';

import { ScopeService } from './scope.service';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        ScopesComponent
    ],
    providers: [
        ScopeService
    ],
    bootstrap: [
        ScopesComponent
    ]
})

export class ScopesModule { }