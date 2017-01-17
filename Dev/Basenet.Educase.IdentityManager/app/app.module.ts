import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

/**
 * Imports AuthGuard module
 */
import { AuthGuard } from './common/auth.guard';

// imports for OAuth2
import { OAuthService } from 'angular2-oauth2/oauth-service';

// other imports
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ScopesComponent } from './scopes/scopes.component';
import { ScopeDetailComponent } from './scopes/scope-detail/scope-detail.component';
import { NavigationComponent } from './navigation/navigation.component';

import { LoginService } from './login/login.service';
import { ClientService } from './clients/client.service';
import { MandatorService } from './mandator/mandator.service';
import { ScopeService } from './scopes/scope.service';
import { ClaimService } from './claims/claim.service';

import { PageNotFoundComponent } from './common/error-pages/pagenotfound.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ClientsComponent,
        ClientDetailComponent,
        ScopesComponent,
        ScopeDetailComponent,
        NavigationComponent,
        PageNotFoundComponent
    ],
    providers: [
        OAuthService,
        AuthGuard,
        LoginService,
        ClientService,
        MandatorService,
        ScopeService,
        ClaimService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }