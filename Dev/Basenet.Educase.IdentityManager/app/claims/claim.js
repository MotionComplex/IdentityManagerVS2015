"use strict";
var Claim = (function () {
    function Claim(UID, Name, Description, AlwaysIncludeInIdToken, IsChecked) {
        this.UID = UID;
        this.Name = Name;
        this.Description = Description;
        this.AlwaysIncludeInIdToken = AlwaysIncludeInIdToken;
        this.IsChecked = IsChecked;
    }
    return Claim;
}());
exports.Claim = Claim;
//# sourceMappingURL=claim.js.map