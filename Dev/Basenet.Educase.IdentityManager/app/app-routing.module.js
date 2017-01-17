"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var pagenotfound_component_1 = require("./common/error-pages/pagenotfound.component");
var auth_guard_1 = require("./common/auth.guard");
var client_service_1 = require("./clients/client.service");
var clients_component_1 = require("./clients/clients.component");
var client_detail_component_1 = require("./clients/client-detail/client-detail.component");
var home_component_1 = require("./home/home.component");
var scopes_component_1 = require("./scopes/scopes.component");
var scope_detail_component_1 = require("./scopes/scope-detail/scope-detail.component");
exports.ROUTES = [
    {
        path: '',
        component: home_component_1.HomeComponent,
        data: {
            pageTitle: 'Home',
            relevantForNav: 'false'
        }
    },
    {
        path: 'clients',
        component: clients_component_1.ClientsComponent,
        data: {
            pageTitle: 'All Clients',
            navTitle: 'Clients',
            relevantForNav: 'true'
        },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'client/:uid',
        component: client_detail_component_1.ClientDetailComponent,
        data: {
            pageTitle: 'Client Detail',
            relevantForNav: 'false'
        },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'scopes',
        component: scopes_component_1.ScopesComponent,
        data: {
            pageTitle: 'All Scopes',
            navTitle: 'Scopes',
            relevantForNav: 'true'
        },
        canActivate: [auth_guard_1.AuthGuard],
        canActivateChild: [auth_guard_1.AuthGuard]
    },
    {
        path: 'scope/:uid',
        component: scope_detail_component_1.ScopeDetailComponent,
        data: {
            pageTitle: 'Scope Detail',
            relevantForNav: 'false'
        },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/404',
        data: {
            relevantForNav: 'false'
        }
    },
    {
        path: '404',
        component: pagenotfound_component_1.PageNotFoundComponent,
        data: {
            relevantForNav: 'false'
        }
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(exports.ROUTES)
        ],
        exports: [
            router_1.RouterModule
        ],
        providers: [
            client_service_1.ClientService
        ]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map