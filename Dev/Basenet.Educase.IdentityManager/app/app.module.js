"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
/**
 * Imports AuthGuard module
 */
var auth_guard_1 = require("./common/auth.guard");
// imports for OAuth2
var oauth_service_1 = require("angular2-oauth2/oauth-service");
// other imports
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var clients_component_1 = require("./clients/clients.component");
var client_detail_component_1 = require("./clients/client-detail/client-detail.component");
var scopes_component_1 = require("./scopes/scopes.component");
var scope_detail_component_1 = require("./scopes/scope-detail/scope-detail.component");
var navigation_component_1 = require("./navigation/navigation.component");
var login_service_1 = require("./login/login.service");
var client_service_1 = require("./clients/client.service");
var mandator_service_1 = require("./mandator/mandator.service");
var scope_service_1 = require("./scopes/scope.service");
var claim_service_1 = require("./claims/claim.service");
var pagenotfound_component_1 = require("./common/error-pages/pagenotfound.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpModule,
            http_1.JsonpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            clients_component_1.ClientsComponent,
            client_detail_component_1.ClientDetailComponent,
            scopes_component_1.ScopesComponent,
            scope_detail_component_1.ScopeDetailComponent,
            navigation_component_1.NavigationComponent,
            pagenotfound_component_1.PageNotFoundComponent
        ],
        providers: [
            oauth_service_1.OAuthService,
            auth_guard_1.AuthGuard,
            login_service_1.LoginService,
            client_service_1.ClientService,
            mandator_service_1.MandatorService,
            scope_service_1.ScopeService,
            claim_service_1.ClaimService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map