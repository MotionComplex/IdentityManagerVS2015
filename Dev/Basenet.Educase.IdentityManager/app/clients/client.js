"use strict";
var Client = (function () {
    // public UID: string;
    // public Id: string;
    // public Name: string;
    // public Flow: string;
    function Client(UID, Id, Name, Flow) {
        this.UID = UID;
        this.Id = Id;
        this.Name = Name;
        this.Flow = Flow;
    }
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map