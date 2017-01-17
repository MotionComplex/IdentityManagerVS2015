"use strict";
var Scope = (function () {
    function Scope(UID, Name, DisplayName, ScopeType, IsRequired, Claims) {
        this.UID = UID;
        this.Name = Name;
        this.DisplayName = DisplayName;
        this.ScopeType = ScopeType;
        this.IsRequired = IsRequired;
        this.Claims = Claims;
    }
    return Scope;
}());
exports.Scope = Scope;
//# sourceMappingURL=scope.js.map