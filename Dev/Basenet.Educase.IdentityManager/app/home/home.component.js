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
var client_service_1 = require("./../clients/client.service");
var login_service_1 = require("./../login/login.service");
var HomeComponent = (function () {
    function HomeComponent(clientService, loginService) {
        this.clientService = clientService;
        this.loginService = loginService;
        this.pageTitle = "Home";
        this.clients = [];
    }
    HomeComponent.prototype.login = function () {
        this.loginService.login();
    };
    HomeComponent.prototype.IsLoggedIn = function () {
        this.loggedIn = this.loginService.IsLoggedIn();
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.IsLoggedIn();
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'home-data',
        templateUrl: 'home.component.html',
        styleUrls: [
            'home.component.css'
        ],
        providers: [
            client_service_1.ClientService,
            login_service_1.LoginService
        ]
    }),
    __metadata("design:paramtypes", [client_service_1.ClientService, login_service_1.LoginService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map