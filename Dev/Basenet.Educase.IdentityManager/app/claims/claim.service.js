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
var ClaimService = (function () {
    function ClaimService(http) {
        this.http = http;
        this.claimUrl = 'http://localhost:35854/api/claim';
        this.scopeToClaimUrl = 'http://localhost:35854/api/scopetoclaim';
        this.headers = new headers_1.contentHeaders();
        this.params = new http_1.URLSearchParams();
        this.options = new http_1.RequestOptions({ headers: this.headers.headers });
    }
    ClaimService.prototype.getClaims = function () {
        return this.http.get(this.claimUrl, this.options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ClaimService.prototype.getAssignedClaims = function (scopeUid) {
        this.params.set('uid', scopeUid);
        this.options.search = this.params;
        var result = this.http.get(this.claimUrl, this.options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        return result;
    };
    ClaimService.prototype.updateAssignedClaims = function (uid, claims) {
        var body = JSON.stringify({
            uid: uid, claims: claims
        });
        return this.http.put(this.scopeToClaimUrl, body, this.options)
            .map(function (res) { return res; })
            .catch(this.handleError);
    };
    ClaimService.prototype.handleError = function (error) {
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
    return ClaimService;
}());
ClaimService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ClaimService);
exports.ClaimService = ClaimService;
//# sourceMappingURL=claim.service.js.map