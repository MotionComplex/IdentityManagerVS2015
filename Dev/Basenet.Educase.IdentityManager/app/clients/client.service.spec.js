//import { TestBed, async } from '@angular/core/testing';
//import { MockBackend } from '@angular/http/testing';
//import { OAuthService } from 'angular2-oauth2/oauth-service';
//import { Observable } from 'rxjs/Observable';
//import { ClientService } from './client.service';
//import { ClientServiceStub } from '../../testing/clients/client.service.stub';
//import { Client } from './client';
//import { CLIENTS } from './mock.clients';
//describe('ClientService', () => {
//    let service: ClientServiceStub;
//    it('#getClients should return the all the clients data', () => {
//        service = new ClientServiceStub(new OAuthService());
//        let clients: Array<Client>;
//        service.getClients().subscribe(data => {
//            clients = data;
//        });
//        expect(clients).toBe(CLIENTS);
//    });
//    it('#getClientByUid should return the requested client', () => {
//        service = new ClientServiceStub(new OAuthService());
//        let expectedClient: Client;
//        expectedClient = CLIENTS[0];
//        expect(service.getClientByUid('1')).toBe(expectedClient);
//    });
//    it('#updateClient should update the client', () => {
//        // let oldClient = new Client('oldvalue', 'oldvalue', 'oldvalue', 'oldvalue');
//        // service = new ClientServiceStub(new OAuthService());
//        // service.updateClient(oldClient).subscribe(data => {});
//        // expect(typeof()).toContain();
//    });
//}); 
//# sourceMappingURL=client.service.spec.js.map