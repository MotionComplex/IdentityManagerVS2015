import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Client } from './../clients/client';
import { ClientService } from './../clients/client.service';
import { LoginService } from './../login/login.service';

@Component({
    moduleId: module.id,
    selector: 'home-data',
    templateUrl: 'home.component.html',
    styleUrls: [
        'home.component.css'
    ],
    providers: [
        ClientService,
        LoginService
    ]
})

export class HomeComponent implements OnInit {
    pageTitle = "Home";
    loggedIn: boolean;

    clients: Client[] = [];

    constructor(private clientService: ClientService, private loginService: LoginService) { }

    public login(){
        this.loginService.login();
    }
    
    public IsLoggedIn(){
        this.loggedIn = this.loginService.IsLoggedIn();
    }

    ngOnInit(): void {
        this.IsLoggedIn();
    }
 }