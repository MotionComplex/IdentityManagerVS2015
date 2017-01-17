import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { Injectable } from '@angular/core';

/**
 * exports class AuthGuard
 */
@Injectable()
export class AuthGuard implements CanActivate {
    private sub: any;
    private uidParam: string;

    constructor(private oauthService: OAuthService/*, private router: Router*/) { }

    /**
     * Activates path if authorized
     */
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) {

            var hasIdToken = this.oauthService.hasValidIdToken();
            var hasAccessToken = this.oauthService.hasValidAccessToken();

            //this.uidParam = route.params['uid'];

            //if (this.uidParam !== null) {
            //    var hasValidGuid = this.validateGuidParam();

            //    this.router.navigate(['/error']);
            //    //return (hasIdToken && hasAccessToken && hasValidGuid);
            //}
        
            return (hasIdToken && hasAccessToken);
    }
}