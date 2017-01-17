import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Claim } from './claim';
import { contentHeaders } from '../common/headers';

@Injectable()
export class ClaimService {
    private claimUrl = 'http://localhost:35854/api/claim';
    private scopeToClaimUrl = 'http://localhost:35854/api/scopetoclaim';
    private headers = new contentHeaders();
    private options: RequestOptions;
    private params = new URLSearchParams();

    constructor(private http: Http) {
        this.options = new RequestOptions({headers: this.headers.headers});
    }

    public getClaims() : Observable<Claim[]> {
        return this.http.get(this.claimUrl, this.options)
                        .map(res => res.json())
                        .catch(this.handleError)
    }

    public getAssignedClaims(scopeUid: string): Observable<Claim[]> {
        this.params.set('uid', scopeUid);
        this.options.search = this.params;
        var result = this.http.get(this.claimUrl, this.options)
                              .map(res => res.json())
                              .catch(this.handleError);

        return result;
    }

    public updateAssignedClaims(uid: string, claims: Claim[]) {
        let body = JSON.stringify({
            uid, claims
        });
        
        return this.http.put(this.scopeToClaimUrl, body, this.options)
            .map(res => res)
            .catch(this.handleError);
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