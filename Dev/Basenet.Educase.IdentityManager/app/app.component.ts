import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { OAuthService } from 'angular2-oauth2/oauth-service';
import { ClientService } from './clients/client.service';

import './common/rxjs-operators';

@Component({
    moduleId: module.id,
    selector:  'my-app',
    templateUrl: 'app.component.html',
    styleUrls: [
        'app.component.css'
    ],
    providers: [
        OAuthService,
        ClientService
    ]
})

@Injectable()
export class AppComponent {
    pageTitle =  'IdentityManager 2017';
    url: string;

    constructor(private oauthService: OAuthService, clientService: ClientService, http: Http) {
        // Login-Url
        this.oauthService.loginUrl = 'http://localhost:35854/core/connect/authorize';

        // URL of the SPA to redirect the user to after login
        this.oauthService.redirectUri = window.location.protocol + '//' + window.location.host;

        // The SPA's id. Register SPA with this id at the auth-server
        this.oauthService.clientId = 'identitymanager';

        // The name of the auth-server that has to be mentioned within the token
        this.oauthService.issuer = 'http://localhost:35854/';

        // set the scope for the permissions the client should request
        this.oauthService.scope = 'openid profile mandant';

        /*set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
        OAuth2-based access_token*/
        this.oauthService.oidc = true;

        // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
        // instead of localStorage
        this.oauthService.setStorage(localStorage);

        // To also enable single-sign-out set the url for your auth-server's logout-endpoint here
        this.oauthService.logoutUrl =
            'http://localhost:35854/core/connect/endsession?id_token_hint={{id_token}}&post_logout_redirect_uri=http://localhost:3000';

        this.saveTokens();
    }

    saveTokens() {
        this.saveAccessToken();
        this.saveIdToken();
    }

    saveIdToken() {
        let hasIdToken = window.location.href.includes('id_token=');

        if (hasIdToken) {
            let tokenStart = window.location.href.search('id_token=');
            let tokenEnd = window.location.href.search('&access_token=');
            let id_token = window.location.href.substring(tokenStart + 9, tokenEnd);
            localStorage.setItem('id_token', id_token);
        }
    }

    saveAccessToken() {
        let hasAccessToken = window.location.href.includes('access_token=');
        if (hasAccessToken) {
            let tokenStart = window.location.href.search('access_token=');
            let tokenEnd = window.location.href.search('&token_type=');
            let access_token = window.location.href.substring(tokenStart + 13, tokenEnd);
            localStorage.setItem('access_token', access_token);
        }
    }
}