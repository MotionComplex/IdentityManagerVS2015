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
var login_service_1 = require("../login/login.service");
var app_routing_module_1 = require("../app-routing.module");
var NavigationComponent = (function () {
    function NavigationComponent(loginService) {
        this.loginService = loginService;
        this.title = "Navigation";
        this.links = app_routing_module_1.ROUTES.filter(function (r) { return r.data['relevantForNav'] === "true"; });
    }
    NavigationComponent.prototype.login = function () {
        this.loginService.login();
    };
    NavigationComponent.prototype.logout = function () {
        console.log("logging out");
        this.loginService.logout();
    };
    NavigationComponent.prototype.IsLoggedIn = function () {
        return this.loginService.IsLoggedIn();
    };
    Object.defineProperty(NavigationComponent.prototype, "userName", {
        get: function () {
            return this.loginService.name;
        },
        enumerable: true,
        configurable: true
    });
    return NavigationComponent;
}());
NavigationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-navigation',
        templateUrl: './navigation.component.html',
        styleUrls: [
            './navigation.component.css'
        ],
        providers: [
            login_service_1.LoginService
        ]
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map