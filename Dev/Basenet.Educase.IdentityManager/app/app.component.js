"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var oauth_service_1 = require("angular2-oauth2/oauth-service");
var client_service_1 = require("./clients/client.service");
require("./common/rxjs-operators");
var AppComponent = (function () {
    function AppComponent(oauthService, clientService, http) {
        this.oauthService = oauthService;
        this.pageTitle = 'IdentityManager 2017';
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
    AppComponent.prototype.saveTokens = function () {
        this.saveAccessToken();
        this.saveIdToken();
    };
    AppComponent.prototype.saveIdToken = function () {
        var hasIdToken = window.location.href.includes('id_token=');
        if (hasIdToken) {
            var tokenStart = window.location.href.search('id_token=');
            var tokenEnd = window.location.href.search('&access_token=');
            var id_token = window.location.href.substring(tokenStart + 9, tokenEnd);
            localStorage.setItem('id_token', id_token);
        }
    };
    AppComponent.prototype.saveAccessToken = function () {
        var hasAccessToken = window.location.href.includes('access_token=');
        if (hasAccessToken) {
            var tokenStart = window.location.href.search('access_token=');
            var tokenEnd = window.location.href.search('&token_type=');
            var access_token = window.location.href.substring(tokenStart + 13, tokenEnd);
            localStorage.setItem('access_token', access_token);
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: 'app.component.html',
        styleUrls: [
            'app.component.css'
        ],
        providers: [
            oauth_service_1.OAuthService,
            client_service_1.ClientService
        ]
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [oauth_service_1.OAuthService, client_service_1.ClientService, http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map