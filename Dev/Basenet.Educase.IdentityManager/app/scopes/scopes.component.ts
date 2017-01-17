import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Scope } from './scope';

import { ScopeService } from './scope.service';
import { ClaimService } from '../claims/claim.service';

@Component({
    moduleId: module.id,
    selector: 'my-scopes',
    templateUrl: 'scopes.component.html',
    styleUrls: [
        'scopes.component.css'
    ],
    providers: [
        ScopeService,
        ClaimService
    ]
})

export class ScopesComponent implements OnInit, OnChanges {
    public pageTitle = "Scopes";
    public errorMessage;
    public noScopesFoundMessage: string = "No scopes found!";
    public scopes: Scope[];
    public filteredScopes: Scope[];
    public hasScopes: boolean;

    constructor(private scopeService: ScopeService) { }
    
    ngOnInit() : void {
        this.getScopes();
    }
    
    ngOnChanges() {
        this.getScopes();
    }

    public addNewScope() {
        location.href = location.origin + "/scope/00000000-0000-0000-0000-000000000000";
    }

    public searchScopes(term: string) {
        this.filteredScopes = this.scopes
            .filter(scope => 
                    (scope.Name != null && scope.Name.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
                ||  (scope.DisplayName != null && scope.DisplayName.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
                ||  (scope.ScopeType != null && scope.ScopeType.toLocaleLowerCase().includes(term.toLocaleLowerCase())))

        this.checkScopes();
    }

    private getScopes() {
        this.scopeService.getScopes()
            .subscribe(data => {
                console.log("data " + JSON.stringify(data));
                this.scopes = data;
                this.filteredScopes = this.scopes;
                this.checkScopes();
            },
            error => this.errorMessage = <any>error);
    }

    private checkScopes() {
        this.hasScopes = this.filteredScopes.length > 0;
    }
}