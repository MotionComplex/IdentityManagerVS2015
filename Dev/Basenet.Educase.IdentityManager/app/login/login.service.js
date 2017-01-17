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
var oauth_service_1 = require("angular2-oauth2/oauth-service");
var LoginService = (function () {
    function LoginService(oauthService) {
        this.oauthService = oauthService;
    }
    LoginService.prototype.login = function () {
        this.oauthService.initImplicitFlow();
    };
    LoginService.prototype.logout = function () {
        this.oauthService.logOut();
    };
    LoginService.prototype.IsLoggedIn = function () {
        var hasAccessToken = this.oauthService.hasValidAccessToken();
        var hasValidIdToken = this.oauthService.hasValidIdToken();
        if (hasAccessToken && hasValidIdToken) {
            return true;
        }
        return false;
    };
    Object.defineProperty(LoginService.prototype, "name", {
        get: function () {
            var claims = this.oauthService.getIdentityClaims();
            if (!claims)
                return null;
            return claims.mandant_id;
        },
        enumerable: true,
        configurable: true
    });
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [oauth_service_1.OAuthService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map