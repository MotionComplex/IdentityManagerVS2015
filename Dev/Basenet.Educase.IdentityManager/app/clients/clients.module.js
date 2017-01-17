"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var clients_component_1 = require("./clients.component");
var client_detail_component_1 = require("./client-detail/client-detail.component");
var client_service_1 = require("./client.service");
var ClientsModule = (function () {
    function ClientsModule() {
    }
    return ClientsModule;
}());
ClientsModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule
        ],
        declarations: [
            clients_component_1.ClientsComponent,
            client_detail_component_1.ClientDetailComponent
        ],
        providers: [
            client_service_1.ClientService
        ],
        bootstrap: [
            clients_component_1.ClientsComponent
        ]
    })
], ClientsModule);
exports.ClientsModule = ClientsModule;
//# sourceMappingURL=clients.module.js.map