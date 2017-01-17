import { Claim } from '../claims/claim';

export class Scope {
    constructor(public UID: string, public Name: string, public DisplayName: string, public ScopeType: string, public IsRequired: boolean, public Claims: Claim[]) { }
}