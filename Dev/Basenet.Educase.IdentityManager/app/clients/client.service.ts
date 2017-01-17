import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import { Client } from './client';
import { contentHeaders } from '../common/headers';
import { Uuid, EMPTY_GUID } from '../common/uuid';

@Injectable()
export class ClientService {
    private clientsUrl = 'http://localhost:35854/api/client';   
    private contentHeaders = new contentHeaders();
    private options: RequestOptions;
    private uuid: Uuid;
                                       
    constructor(private http: Http, private oauthService: OAuthService) {
        this.options = new RequestOptions({headers: this.contentHeaders.headers});
        this.uuid = new Uuid();
    }

    public getClients() : Observable<Client[]> {
        return this.http.get(this.clientsUrl, this.options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    //public getClientByUid(uid: string): Observable<Client> {
    //    return this.http.get(this.clientsUrl + '/' + uid, this.options)
    //        .map(res => res.json())
    //        .catch(this.handleError);
    //}

    public getClientByUid(uid: string) : Client {
        let client: Client;
        this.getClients()
            .subscribe(data => {
                client = data.find(client => client.UID === uid);
            });

        return client;
    }

    public updateClient(client: Client) : Observable<Client[]> {       
        let clientString = JSON.stringify(client);
        
        let options = this.options;

        return this.http.put(this.clientsUrl, clientString, options)
            .map(res => res)
            .catch(this.handleError);
    }

    private extractData(res: Response){
        let body = res.json();
        console.log("RESULT: " + JSON.stringify(body));

        return body.data || { };
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