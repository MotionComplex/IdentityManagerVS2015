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
var oauth_service_1 = require("angular2-oauth2/oauth-service");
var core_1 = require("@angular/core");
/**
 * exports class AuthGuard
 */
var AuthGuard = (function () {
    function AuthGuard(oauthService /*, private router: Router*/) {
        this.oauthService = oauthService; /*, private router: Router*/
    }
    /**
     * Activates path if authorized
     */
    AuthGuard.prototype.canActivate = function (route, state) {
        var hasIdToken = this.oauthService.hasValidIdToken();
        var hasAccessToken = this.oauthService.hasValidAccessToken();
        //this.uidParam = route.params['uid'];
        //if (this.uidParam !== null) {
        //    var hasValidGuid = this.validateGuidParam();
        //    this.router.navigate(['/error']);
        //    //return (hasIdToken && hasAccessToken && hasValidGuid);
        //}
        return (hasIdToken && hasAccessToken);
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [oauth_service_1.OAuthService /*, private router: Router*/])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map