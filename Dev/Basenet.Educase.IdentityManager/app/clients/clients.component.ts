import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Client } from './client';

import { ClientService } from './client.service';

@Component({
    moduleId: module.id,
    selector: 'my-clients',
    templateUrl: './clients.component.html',
    styleUrls: [
        'clients.component.css'
    ],
    providers: [
        ClientService
    ]
})


export class ClientsComponent implements OnInit, OnChanges {
    public pageTitle = "Clients";
    public clients: Client[];
    public filteredClients: Client[];
    public searchValue: string;
    public errorMessage;
    public noClientsFoundMessage: string = "No clients found!";
    public hasClients: boolean;

    constructor(private clientService: ClientService, private router: Router) { }
    
    public addClient() {
        location.href = location.origin + "/client/00000000-0000-0000-0000-000000000000";
    }

    public getClients() {
        this.clientService.getClients()
                            .subscribe(
                                data => {
                                    this.clients = data;
                                    this.filteredClients = this.clients;
                                    this.checkClients()
                                },
                                error => this.errorMessage = <any>error);
    }

    public searchClients(term: string) {
        this.filteredClients = this.clients
            .filter(client => 
                    client.Id.toLocaleLowerCase().includes(term.toLocaleLowerCase()) 
                ||  client.Name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
                ||  client.Flow.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
        
        this.checkClients()
    }

    private checkClients(){
        this.hasClients = this.filteredClients.length > 0;
    }
    
    ngOnChanges() {
        this.getClients()
    }

    ngOnInit() {
        this.getClients()
    }
}