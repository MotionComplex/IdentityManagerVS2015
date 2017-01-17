"use strict";
exports.EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
var Uuid = (function () {
    function Uuid() {
    }
    Uuid.prototype.generateUUID = function () {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    Uuid.prototype.validateGuidParam = function (guid) {
        var regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        var match = regex.exec(guid);
        return match !== null;
    };
    return Uuid;
}());
exports.Uuid = Uuid;
//# sourceMappingURL=uuid.js.map