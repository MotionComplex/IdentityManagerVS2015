import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import { contentHeaders } from '../common/headers';

import { Mandator } from './mandator';

@Injectable()
export class MandatorService { 
    private mandatorsUrl = 'http://localhost:35854/api/mandator';
    private clientToMandatorUrl = 'http://localhost:35854/api/clienttomandator';
    private params = new URLSearchParams();
    private options: RequestOptions;
    private contentHeaders = new contentHeaders();

    constructor(private http: Http, private oauthService: OAuthService) {
        this.options = new RequestOptions({ headers: this.contentHeaders.headers });
    }

    public getMandators(): Observable<Mandator[]> {
        return this.http.get(this.mandatorsUrl, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    public getAssignedMandators(clientUid: string): Observable<Mandator[]> {
        this.params.set('uid', clientUid);
        this.options.search = this.params;
        var result = this.http.get(this.mandatorsUrl, this.options)
            .map(res => res.json())
            .catch(this.handleError);

        return result;
    }

    public updateAssignedMandators(uid: string, mandators: Mandator[]) {
        let body = JSON.stringify({
            uid, mandators
        });
        
        console.log(body);
        console.log(this.clientToMandatorUrl);
        return this.http.put(this.clientToMandatorUrl, body, this.options)
            .map(res => res)
            .catch(this.handleError);
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
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