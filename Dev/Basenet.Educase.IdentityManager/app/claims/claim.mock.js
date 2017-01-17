"use strict";
var claim_1 = require("./claim");
exports.CLAIMS = [
    new claim_1.Claim('1', 'Claim1', 'Description of Claim1', true, false),
    new claim_1.Claim('2', 'Claim2', 'Description of Claim2', false, false),
    new claim_1.Claim('3', 'Claim3', 'Description of Claim3', true, false),
    new claim_1.Claim('4', 'Claim4', 'Description of Claim4', false, false),
    new claim_1.Claim('5', 'Claim5', 'Description of Claim5', false, false),
    new claim_1.Claim('6', 'Claim6', 'Description of Claim6', true, false),
    new claim_1.Claim('7', 'Claim7', 'Description of Claim7', true, false),
    new claim_1.Claim('8', 'Claim8', 'Description of Claim8', false, false),
    new claim_1.Claim('9', 'Claim9', 'Description of Claim9', true, false),
    new claim_1.Claim('10', 'Claim10', 'Description of Claim10', false, false)
];
exports.ASSIGNED_CLAIMS = [
    new claim_1.Claim('4', 'Claim4', 'Description of Claim4', false, true),
    new claim_1.Claim('5', 'Claim5', 'Description of Claim5', false, true),
    new claim_1.Claim('6', 'Claim6', 'Description of Claim6', true, true),
    new claim_1.Claim('7', 'Claim7', 'Description of Claim7', true, true),
];
//# sourceMappingURL=claim.mock.js.map