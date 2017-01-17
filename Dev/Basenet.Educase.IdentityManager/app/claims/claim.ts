export class Claim {
    constructor(public UID: string, public Name: string, public Description: string, public AlwaysIncludeInIdToken: boolean, public IsChecked: boolean) { }
}