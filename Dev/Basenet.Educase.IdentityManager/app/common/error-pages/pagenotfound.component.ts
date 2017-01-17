import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-page-not-found',
    moduleId: module.id,
    templateUrl: 'pagenotfound.component.html',
    styleUrls: [
        'pagenotfound.component.css'
    ]
})

export class PageNotFoundComponent implements OnInit {
    public messageTitle: string;
    public message: string;

    constructor() { }

    ngOnInit() {
        this.messageTitle = "404 - Page not found";
        this.message = "This page is not available.";
    }
}