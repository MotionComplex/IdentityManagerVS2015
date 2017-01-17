import { Component, OnInit, Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Routes } from '@angular/router';
import { ROUTES } from '../app-routing.module';

@Component({
    moduleId: module.id,
    selector: 'my-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: [
        './navigation.component.css'
    ],
    providers: [
        LoginService
    ]
})

@Injectable()
export class NavigationComponent { 
    public title = "Navigation";
    public links = ROUTES.filter(r => r.data['relevantForNav'] === "true");
    
    constructor(private loginService: LoginService) { }

    login(){
        this.loginService.login();
    }

    logout(){
        console.log("logging out");
        this.loginService.logout();
    }

    public IsLoggedIn(): boolean{
        return this.loginService.IsLoggedIn();
    }

    public get userName(){
        return this.loginService.name;
    }
}