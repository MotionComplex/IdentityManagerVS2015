import { Http, Headers } from '@angular/http';
import { OAuthService } from 'angular2-oauth2/oauth-service';

export class contentHeaders {
    public headers = new Headers();

    constructor() {
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json');
        this.headers.append("Authorization", "Bearer " + window.localStorage.getItem("access_token"));
    }
}