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
var oauth_service_1 = require("angular2-oauth2/oauth-service");
var headers_1 = require("../common/headers");
var uuid_1 = require("../common/uuid");
var ClientService = (function () {
    function ClientService(http, oauthService) {
        this.http = http;
        this.oauthService = oauthService;
        this.clientsUrl = 'http://localhost:35854/api/client';
        this.contentHeaders = new headers_1.contentHeaders();
        this.options = new http_1.RequestOptions({ headers: this.contentHeaders.headers });
        this.uuid = new uuid_1.Uuid();
    }
    ClientService.prototype.getClients = function () {
        return this.http.get(this.clientsUrl, this.options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //public getClientByUid(uid: string): Observable<Client> {
    //    return this.http.get(this.clientsUrl + '/' + uid, this.options)
    //        .map(res => res.json())
    //        .catch(this.handleError);
    //}
    ClientService.prototype.getClientByUid = function (uid) {
        var client;
        this.getClients()
            .subscribe(function (data) {
            client = data.find(function (client) { return client.UID === uid; });
        });
        return client;
    };
    ClientService.prototype.updateClient = function (client) {
        var clientString = JSON.stringify(client);
        var options = this.options;
        return this.http.put(this.clientsUrl, clientString, options)
            .map(function (res) { return res; })
            .catch(this.handleError);
    };
    ClientService.prototype.extractData = function (res) {
        var body = res.json();
        console.log("RESULT: " + JSON.stringify(body));
        return body.data || {};
    };
    ClientService.prototype.handleError = function (error) {
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
    return ClientService;
}());
ClientService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, oauth_service_1.OAuthService])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map