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
var scope_service_1 = require("../scope.service");
var claim_service_1 = require("../../claims/claim.service");
var scope_1 = require("../../scopes/scope");
var uuid_1 = require("../../common/uuid");
var ScopeDetailComponent = (function () {
    function ScopeDetailComponent(scopeService, claimService, route, location, router) {
        this.scopeService = scopeService;
        this.claimService = claimService;
        this.route = route;
        this.location = location;
        this.router = router;
        this.scopeTypes = [
            "Identity",
            "Resource"
        ];
        this.uuid = new uuid_1.Uuid();
    }
    ScopeDetailComponent.prototype.getScopeByUid = function (scopeUid) {
        var _this = this;
        this.scopeService.getScopes()
            .subscribe(function (data) {
            _this.scope = data.find(function (scope) { return scope.UID === scopeUid; });
            console.log("SCOPEDETAIL: " + _this.scope);
        });
    };
    ScopeDetailComponent.prototype.getScopeDetail = function () {
        var _this = this;
        this.route.params
            .forEach(function (params) {
            _this.scopeUid = params['uid'];
        });
        if (this.scopeUid === uuid_1.EMPTY_GUID) {
            this.scope = new scope_1.Scope(this.scopeUid, "", "", "", false, null);
        }
        else {
            var validGuid = this.uuid.validateGuidParam(this.scopeUid);
            if (validGuid) {
                this.getScopeByUid(this.scopeUid);
            }
            else {
                console.log("invalid guid: " + this.scopeUid);
                this.router.navigate(['**']);
            }
        }
    };
    ScopeDetailComponent.prototype.getAssignedClaims = function () {
        var _this = this;
        this.claimService.getAssignedClaims(this.scopeUid)
            .subscribe(function (data) {
            _this.assignedClaims = data;
            _this.checkAssignedClaims();
        }, function (error) { return _this.errorMessage = error; });
    };
    ScopeDetailComponent.prototype.checkAssignedClaims = function () {
        var _this = this;
        if (this.assignedClaims) {
            this.assignedClaims.forEach(function (ac) {
                _this.claims.forEach(function (c) {
                    if (c.UID === ac.UID) {
                        c.IsChecked = true;
                    }
                });
            });
        }
    };
    ScopeDetailComponent.prototype.getClaims = function () {
        var _this = this;
        this.claimService.getClaims()
            .subscribe(function (data) {
            _this.claims = data;
        });
    };
    ScopeDetailComponent.prototype.goBack = function () {
        this.router.navigateByUrl('/scopes');
    };
    ScopeDetailComponent.prototype.save = function () {
        this.updateScope();
    };
    // TODO: Refresh URI with new GUID !!!!!!!!!!!!!!!!!!
    ScopeDetailComponent.prototype.updateScope = function () {
        var _this = this;
        if (this.scope.UID == uuid_1.EMPTY_GUID) {
            var newGuid = this.uuid.generateUUID();
            this.scopeUid = newGuid;
            this.scope.UID = this.scopeUid;
        }
        this.scopeService.updateScope(this.scope)
            .subscribe(function (data) {
            _this.isSuccessful = true;
            _this.isError = false;
        }, function (error) {
            _this.errorMessage = error;
            _this.isSuccessful = false;
            _this.isError = true;
        });
        if (newGuid) {
            this.location.go('/', newGuid);
        }
        this.updateAssignedClaims();
    };
    ScopeDetailComponent.prototype.updateAssignedClaims = function () {
        var _this = this;
        this.assignedClaims = this.claims.filter(function (c) { return c.IsChecked === true; });
        this.claimService.updateAssignedClaims(this.scopeUid, this.assignedClaims)
            .subscribe(function (data) {
            _this.isSuccessful = true;
            _this.isError = false;
        }, function (err) {
            _this.isSuccessful = false;
            _this.isError = true;
        });
    };
    ScopeDetailComponent.prototype.checkAllClaims = function () {
        var _this = this;
        this.claims.forEach(function (c) { return c.IsChecked = !_this.allChecked; });
        this.assignedClaims = this.claims;
    };
    ScopeDetailComponent.prototype.ngOnInit = function () {
        this.getScopeDetail();
        this.getClaims();
        if (this.scopeUid !== uuid_1.EMPTY_GUID) {
            this.getAssignedClaims();
        }
        this.isSuccessful = false;
        this.isError = false;
    };
    return ScopeDetailComponent;
}());
ScopeDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'scope-detail.component.html',
        styleUrls: [
            'scope-detail.component.css'
        ],
        providers: [
            scope_service_1.ScopeService,
            claim_service_1.ClaimService
        ]
    }),
    __metadata("design:paramtypes", [scope_service_1.ScopeService, claim_service_1.ClaimService, router_1.ActivatedRoute, common_1.Location, router_1.Router])
], ScopeDetailComponent);
exports.ScopeDetailComponent = ScopeDetailComponent;
//# sourceMappingURL=scope-detail.component.js.map