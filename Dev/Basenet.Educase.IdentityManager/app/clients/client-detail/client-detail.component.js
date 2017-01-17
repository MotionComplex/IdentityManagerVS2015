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
var common_1 = require("@angular/common");
var client_service_1 = require("../client.service");
var mandator_service_1 = require("../../mandator/mandator.service");
var client_1 = require("../client");
var uuid_1 = require("../../common/uuid");
exports.EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
var ClientDetailComponent = (function () {
    function ClientDetailComponent(clientService, mandatorService, route, location, router) {
        this.clientService = clientService;
        this.mandatorService = mandatorService;
        this.route = route;
        this.location = location;
        this.router = router;
        this.pageTitle = "Detail";
        this.flows = [
            "AuthorizationCode",
            "Implicit",
            "Hybrid",
            "ClientCredentials",
            "ResourceOwner",
            "Custom",
            "AuthorizationCodeWithProofKey",
            "HybridWithProofKey"
        ];
        this.uuid = new uuid_1.Uuid();
    }
    ClientDetailComponent.prototype.ngOnInit = function () {
        this.getClientDetail();
        this.getAllMandators();
        this.getAssignedMandators();
        this.initializeAlerts();
    };
    ClientDetailComponent.prototype.goBack = function () {
        this.router.navigateByUrl('/clients');
    };
    // TODO: Validate inputs
    ClientDetailComponent.prototype.save = function () {
        this.updateClient();
    };
    ClientDetailComponent.prototype.updateClient = function () {
        var _this = this;
        var newGuid;
        if (this.client.UID === exports.EMPTY_GUID) {
            newGuid = this.uuid.generateUUID();
            console.log("newGuid: " + newGuid);
            this.clientUid = newGuid;
            this.client.UID = this.clientUid;
        }
        this.clientService.updateClient(this.client)
            .subscribe(function (data) {
            _this.isSuccessful = true;
            _this.isError = false;
        }, function (err) {
            _this.isSuccessful = false;
            _this.isError = true;
        });
        if (newGuid) {
            this.location.go('/', newGuid);
            console.log("ChangedParam: " + this.route.params['uid']);
        }
        this.updateAssignedMandators();
    };
    ClientDetailComponent.prototype.updateAssignedMandators = function () {
        var _this = this;
        this.assignedMandators = this.mandators.filter(function (m) { return m.IsChecked === true; });
        this.mandatorService.updateAssignedMandators(this.clientUid, this.assignedMandators)
            .subscribe(function (data) {
            _this.isSuccessful = true;
            _this.isError = false;
        }, function (err) {
            _this.isSuccessful = false;
            _this.isError = true;
        });
    };
    ClientDetailComponent.prototype.getAllMandators = function () {
        var _this = this;
        this.mandatorService.getMandators()
            .subscribe(function (data) {
            _this.mandators = data;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    ClientDetailComponent.prototype.getAssignedMandators = function () {
        var _this = this;
        this.mandatorService.getAssignedMandators(this.clientUid)
            .subscribe(function (data) {
            _this.assignedMandators = data;
            _this.checkAssignedMandators();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    ClientDetailComponent.prototype.checkAssignedMandators = function () {
        var _this = this;
        if (this.assignedMandators) {
            this.assignedMandators.forEach(function (am) {
                _this.mandators.forEach(function (m) {
                    if (m.UID === am.UID) {
                        m.IsChecked = true;
                    }
                });
            });
        }
    };
    ClientDetailComponent.prototype.getClientByUid = function (uid) {
        var _this = this;
        this.clientService.getClients()
            .subscribe(function (data) {
            _this.client = data.find(function (c) { return c.UID === uid; });
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    ClientDetailComponent.prototype.initializeAlerts = function () {
        this.isSuccessful = false;
        this.isError = false;
    };
    ClientDetailComponent.prototype.getClientDetail = function () {
        var _this = this;
        this.route.params
            .forEach(function (params) {
            _this.clientUid = params['uid'];
        });
        if (this.clientUid === exports.EMPTY_GUID) {
            this.client = new client_1.Client(this.clientUid, "", "", "");
        }
        else {
            var validGuid = this.uuid.validateGuidParam(this.clientUid);
            if (validGuid) {
                this.getClientByUid(this.clientUid);
            }
            else {
                console.log("invalid guid: " + this.clientUid);
                this.router.navigate(['**']);
            }
        }
    };
    ClientDetailComponent.prototype.checkAllMandators = function () {
        var _this = this;
        this.mandators.forEach(function (m) { return m.IsChecked = _this.allChecked; });
        this.assignedMandators = this.mandators;
        console.log("checked or unchecked all mandators");
    };
    return ClientDetailComponent;
}());
ClientDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-client-detail',
        templateUrl: 'client-detail.component.html',
        styleUrls: [
            'client-detail.component.css'
        ],
        providers: [
            client_service_1.ClientService,
            mandator_service_1.MandatorService
        ]
    }),
    __metadata("design:paramtypes", [client_service_1.ClientService, mandator_service_1.MandatorService, router_1.ActivatedRoute, common_1.Location, router_1.Router])
], ClientDetailComponent);
exports.ClientDetailComponent = ClientDetailComponent;
//# sourceMappingURL=client-detail.component.js.map