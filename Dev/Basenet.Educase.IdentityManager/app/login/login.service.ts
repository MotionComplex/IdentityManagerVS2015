import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Injectable()
export class LoginService { 
    constructor(private oauthService: OAuthService) { }

    login() {
        this.oauthService.initImplicitFlow();
    }

    logout() {
        this.oauthService.logOut();
    }

    public IsLoggedIn() : boolean {
        var hasAccessToken = this.oauthService.hasValidAccessToken();
        var hasValidIdToken = this.oauthService.hasValidIdToken();
        
        if(hasAccessToken && hasValidIdToken) {
            return true;
        }

        return false;
    }

    public get name() {
        let claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        return claims.mandant_id; 
    }
}