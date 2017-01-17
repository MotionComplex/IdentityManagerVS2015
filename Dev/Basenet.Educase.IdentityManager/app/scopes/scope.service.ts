import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Scope } from './scope';
import { Claim } from '../claims/claim';
import { contentHeaders } from '../common/headers';

@Injectable()
export class ScopeService { 
    private scopeUrl = 'http://localhost:35854/api/scope';
    private claimUrl = 'http://localhost:35854/api/claim';
    private options: RequestOptions;
    private contentHeaders: contentHeaders;

    constructor(private http: Http) { 
        this.contentHeaders = new contentHeaders();
        this.options = new RequestOptions({headers: this.contentHeaders.headers })
    }

    public getScopes() : Observable<Scope[]> {
        return this.http.get(this.scopeUrl, this.options)
                        .map(res => res.json())
                        .catch(this.handleError);
    }
  
    public updateScope(scope: Scope) : Observable<Scope[]> {
        console.log("Service updateScope()");
        var scopeString = JSON.stringify(scope);
        console.log("Service passed scope: " + scopeString);
        return this.http.put(this.scopeUrl, scopeString, this.options)
                        .map(res => res)
                        .catch(this.handleError)
    }
    
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        console.log("ERROR");
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log("error thrown");
        console.log(errMsg);
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}