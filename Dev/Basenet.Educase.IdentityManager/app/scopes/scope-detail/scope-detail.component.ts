import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ScopeService } from '../scope.service';
import { ClaimService } from '../../claims/claim.service';

import { Scope } from '../../scopes/scope';
import { Claim } from '../../claims/claim';
import { Uuid, EMPTY_GUID } from '../../common/uuid';

@Component({
    moduleId: module.id,
    templateUrl: 'scope-detail.component.html',
    styleUrls: [
        'scope-detail.component.css'
    ],
    providers: [
        ScopeService,
        ClaimService
    ]
})

export class ScopeDetailComponent implements OnInit { 
    public allChecked: boolean;
    public uuid: Uuid;
    public scope: Scope;
    public scopeUid: string;
    public errorMessage;
    public isSuccessful: boolean;
    public isError: boolean;
    public claims: Claim[];
    public assignedClaims: Claim[];
    public scopeTypes = [
        "Identity",
        "Resource"
    ];

    constructor(private scopeService: ScopeService, private claimService: ClaimService, private route: ActivatedRoute, private location: Location, private router: Router) { 
        this.uuid = new Uuid();
    }
    
    private getScopeByUid(scopeUid: string) {
        this.scopeService.getScopes()
            .subscribe(data => {
                this.scope = data.find(scope => scope.UID === scopeUid);
                console.log("SCOPEDETAIL: " + this.scope);
            })
    }

    private getScopeDetail() {
        this.route.params
            .forEach((params: Params) => {
                this.scopeUid = params['uid'];
            });

        if (this.scopeUid === EMPTY_GUID) {
            this.scope = new Scope(this.scopeUid, "", "", "", false, null);
        } else {
            let validGuid = this.uuid.validateGuidParam(this.scopeUid);
            if (validGuid) {
                this.getScopeByUid(this.scopeUid);
            } else {
                console.log("invalid guid: " + this.scopeUid);
                this.router.navigate(['**']);
            }
        }
    }

    private getAssignedClaims() {
        this.claimService.getAssignedClaims(this.scopeUid)
            .subscribe(data => {
                this.assignedClaims = data;
                this.checkAssignedClaims();
            },
            error => this.errorMessage = <any>error);
    }

    private checkAssignedClaims() {
        if(this.assignedClaims) {
            this.assignedClaims.forEach(ac => {
                this.claims.forEach(c => {
                    if(c.UID === ac.UID) {
                        c.IsChecked = true; 
                    }
                })
            })
        }
    }

    private getClaims() {
        this.claimService.getClaims()
            .subscribe(data => {
                this.claims = data;
            })
    }

    private goBack() : void{
        this.router.navigateByUrl('/scopes');
    }

    private save() : void {
        this.updateScope();
    }

    // TODO: Refresh URI with new GUID !!!!!!!!!!!!!!!!!!
    private updateScope() {
        if(this.scope.UID == EMPTY_GUID) {
            var newGuid = this.uuid.generateUUID();
            this.scopeUid = newGuid;
            this.scope.UID = this.scopeUid;
        }

        this.scopeService.updateScope(this.scope)
            .subscribe(data => {
                this.isSuccessful = true;
                this.isError = false;
            },
            error => {
                this.errorMessage = <any>error
                this.isSuccessful = false;
                this.isError = true;
            });

        if(newGuid) {
            this.location.go('/', newGuid);
        }

        this.updateAssignedClaims();
    }

    private updateAssignedClaims() {
        this.assignedClaims = this.claims.filter(c => c.IsChecked === true);

        this.claimService.updateAssignedClaims(this.scopeUid, this.assignedClaims)
            .subscribe(data => {
                this.isSuccessful = true;
                this.isError = false;
            },
            (err: any) => {
                this.isSuccessful = false;
                this.isError = true;
            })
    }

    public checkAllClaims(){
        this.claims.forEach(c => c.IsChecked = !this.allChecked);
        this.assignedClaims = this.claims;
    }
    
    ngOnInit() {
        this.getScopeDetail();
        this.getClaims();
        if(this.scopeUid !== EMPTY_GUID){
            this.getAssignedClaims();
        }
        
        this.isSuccessful = false;
        this.isError = false;
    }
}