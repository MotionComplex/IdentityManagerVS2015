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
var router_1 = require("@angular/router");
var client_service_1 = require("./client.service");
var ClientsComponent = (function () {
    function ClientsComponent(clientService, router) {
        this.clientService = clientService;
        this.router = router;
        this.pageTitle = "Clients";
        this.noClientsFoundMessage = "No clients found!";
    }
    ClientsComponent.prototype.addClient = function () {
        location.href = location.origin + "/client/00000000-0000-0000-0000-000000000000";
    };
    ClientsComponent.prototype.getClients = function () {
        var _this = this;
        this.clientService.getClients()
            .subscribe(function (data) {
            _this.clients = data;
            _this.filteredClients = _this.clients;
            _this.checkClients();
        }, function (error) { return _this.errorMessage = error; });
    };
    ClientsComponent.prototype.searchClients = function (term) {
        this.filteredClients = this.clients
            .filter(function (client) {
            return client.Id.toLocaleLowerCase().includes(term.toLocaleLowerCase())
                || client.Name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
                || client.Flow.toLocaleLowerCase().includes(term.toLocaleLowerCase());
        });
        this.checkClients();
    };
    ClientsComponent.prototype.checkClients = function () {
        this.hasClients = this.filteredClients.length > 0;
    };
    ClientsComponent.prototype.ngOnChanges = function () {
        this.getClients();
    };
    ClientsComponent.prototype.ngOnInit = function () {
        this.getClients();
    };
    return ClientsComponent;
}());
ClientsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-clients',
        templateUrl: './clients.component.html',
        styleUrls: [
            'clients.component.css'
        ],
        providers: [
            client_service_1.ClientService
        ]
    }),
    __metadata("design:paramtypes", [client_service_1.ClientService, router_1.Router])
], ClientsComponent);
exports.ClientsComponent = ClientsComponent;
//# sourceMappingURL=clients.component.js.map