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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var headers_1 = require("../common/headers");
var ScopeService = (function () {
    function ScopeService(http) {
        this.http = http;
        this.scopeUrl = 'http://localhost:35854/api/scope';
        this.claimUrl = 'http://localhost:35854/api/claim';
        this.contentHeaders = new headers_1.contentHeaders();
        this.options = new http_1.RequestOptions({ headers: this.contentHeaders.headers });
    }
    ScopeService.prototype.getScopes = function () {
        return this.http.get(this.scopeUrl, this.options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ScopeService.prototype.updateScope = function (scope) {
        console.log("Service updateScope()");
        var scopeString = JSON.stringify(scope);
        console.log("Service passed scope: " + scopeString);
        return this.http.put(this.scopeUrl, scopeString, this.options)
            .map(function (res) { return res; })
            .catch(this.handleError);
    };
    ScopeService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        console.log("ERROR");
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log("error thrown");
        console.log(errMsg);
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return ScopeService;
}());
ScopeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ScopeService);
exports.ScopeService = ScopeService;
//# sourceMappingURL=scope.service.js.map