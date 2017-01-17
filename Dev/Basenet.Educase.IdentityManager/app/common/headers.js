"use strict";
var http_1 = require("@angular/http");
var contentHeaders = (function () {
    function contentHeaders() {
        this.headers = new http_1.Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json');
        this.headers.append("Authorization", "Bearer " + window.localStorage.getItem("access_token"));
    }
    return contentHeaders;
}());
exports.contentHeaders = contentHeaders;
//# sourceMappingURL=headers.js.map