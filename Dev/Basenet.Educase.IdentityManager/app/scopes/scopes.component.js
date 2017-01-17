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
var scope_service_1 = require("./scope.service");
var claim_service_1 = require("../claims/claim.service");
var ScopesComponent = (function () {
    function ScopesComponent(scopeService) {
        this.scopeService = scopeService;
        this.pageTitle = "Scopes";
        this.noScopesFoundMessage = "No scopes found!";
    }
    ScopesComponent.prototype.ngOnInit = function () {
        this.getScopes();
    };
    ScopesComponent.prototype.ngOnChanges = function () {
        this.getScopes();
    };
    ScopesComponent.prototype.addNewScope = function () {
        location.href = location.origin + "/scope/00000000-0000-0000-0000-000000000000";
    };
    ScopesComponent.prototype.searchScopes = function (term) {
        this.filteredScopes = this.scopes
            .filter(function (scope) {
            return (scope.Name != null && scope.Name.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
                || (scope.DisplayName != null && scope.DisplayName.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
                || (scope.ScopeType != null && scope.ScopeType.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
        });
        this.checkScopes();
    };
    ScopesComponent.prototype.getScopes = function () {
        var _this = this;
        this.scopeService.getScopes()
            .subscribe(function (data) {
            console.log("data " + JSON.stringify(data));
            _this.scopes = data;
            _this.filteredScopes = _this.scopes;
            _this.checkScopes();
        }, function (error) { return _this.errorMessage = error; });
    };
    ScopesComponent.prototype.checkScopes = function () {
        this.hasScopes = this.filteredScopes.length > 0;
    };
    return ScopesComponent;
}());
ScopesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-scopes',
        templateUrl: 'scopes.component.html',
        styleUrls: [
            'scopes.component.css'
        ],
        providers: [
            scope_service_1.ScopeService,
            claim_service_1.ClaimService
        ]
    }),
    __metadata("design:paramtypes", [scope_service_1.ScopeService])
], ScopesComponent);
exports.ScopesComponent = ScopesComponent;
//# sourceMappingURL=scopes.component.js.map