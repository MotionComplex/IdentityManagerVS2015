import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ClientService } from '../client.service';
import { MandatorService } from '../../mandator/mandator.service';

import { Client } from '../client';
import { Mandator } from '../../mandator/mandator';
import { Uuid } from '../../common/uuid';

export const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

@Component({
    moduleId: module.id,
    selector: 'my-client-detail',
    templateUrl: 'client-detail.component.html',
    styleUrls: [
        'client-detail.component.css'
    ],
    providers: [
        ClientService,
        MandatorService
    ]
})

export class ClientDetailComponent implements OnInit {
    public pageTitle = "Detail";
    public allChecked: boolean;
    public isSuccessful: boolean;
    public isError: boolean;
    public clientUid: string;
    public res: string;
    public errorMessage: any;
    public client: Client;
    public mandators: Mandator[];
    public assignedMandators: Mandator[];
    public uuid: Uuid;
    public flows = [
        "AuthorizationCode",
        "Implicit",
        "Hybrid",
        "ClientCredentials",
        "ResourceOwner",
        "Custom",
        "AuthorizationCodeWithProofKey",
        "HybridWithProofKey"
    ];

    constructor(private clientService: ClientService, private mandatorService: MandatorService, private route: ActivatedRoute, private location: Location, private router: Router) { 
        this.uuid = new Uuid();
    }

    ngOnInit() : void {
        this.getClientDetail();
        this.getAllMandators();
        this.getAssignedMandators();
        this.initializeAlerts();
    }

    private goBack() : void{
        this.router.navigateByUrl('/clients');
    }

    // TODO: Validate inputs
    private save() : void {
        this.updateClient();
    }

    private updateClient() {
        let newGuid: string;
        if(this.client.UID === EMPTY_GUID){
            newGuid = this.uuid.generateUUID();
            console.log("newGuid: " + newGuid);
            this.clientUid = newGuid;
            this.client.UID = this.clientUid;
        }

        this.clientService.updateClient(this.client)
            .subscribe(data => {
                this.isSuccessful = true;
                this.isError = false;
            },
            (err: any) => {
                this.isSuccessful = false;
                this.isError = true;
            });

        if (newGuid) {
            this.location.go('/', newGuid);
            console.log("ChangedParam: " + this.route.params['uid']);
        }

        this.updateAssignedMandators();
    }

    private updateAssignedMandators() {
        this.assignedMandators = this.mandators.filter(m => m.IsChecked === true);

        this.mandatorService.updateAssignedMandators(this.clientUid, this.assignedMandators)
            .subscribe(data => {
                this.isSuccessful = true;
                this.isError = false;
            },
            (err: any) => {
                this.isSuccessful = false;
                this.isError = true;
            });
    }

    private getAllMandators() {
        this.mandatorService.getMandators()
                .subscribe(data => {
                    this.mandators = data;
                },
                error => {
                    this.errorMessage = <any>error;
                });
    }

    private getAssignedMandators() {
        this.mandatorService.getAssignedMandators(this.clientUid)
                .subscribe(data => {
                    this.assignedMandators = data;
                    this.checkAssignedMandators();
                },
                error => {
                    this.errorMessage = <any>error;
                });
    }

    private checkAssignedMandators() {
        if(this.assignedMandators) {
            this.assignedMandators.forEach(am => {
                this.mandators.forEach(m => {
                    if (m.UID === am.UID) {
                        m.IsChecked = true;
                    }
                });
            });
        }
    }

    private getClientByUid(uid: string) {
        this.clientService.getClients()
            .subscribe(data => {
                    this.client = data.find(c => c.UID === uid);
                },
                error => {
                    this.errorMessage = <any>error;
                });
    }

    private initializeAlerts() {
        this.isSuccessful = false;
        this.isError = false;
    }

    private getClientDetail() {
        this.route.params
            .forEach((params: Params) => {
                this.clientUid = params['uid'];
            });
        
        if (this.clientUid === EMPTY_GUID) {
            this.client = new Client(this.clientUid, "", "", "");
        } else {
            let validGuid = this.uuid.validateGuidParam(this.clientUid);
            if (validGuid) {
                this.getClientByUid(this.clientUid);
            } else {
                console.log("invalid guid: " + this.clientUid);
                this.router.navigate(['**']);
            }
        }
    }

    public checkAllMandators() {
        this.mandators.forEach(m => m.IsChecked = this.allChecked);
        this.assignedMandators = this.mandators;
        console.log("checked or unchecked all mandators");
    }
}