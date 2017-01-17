//import { TestBed, async, ComponentFixture } from '@angular/core/testing';
//import { DebugElement } from '@angular/core';
//import { By } from '@angular/platform-browser';
//import { MockBackend } from '@angular/http/testing';
//import { contentHeaders } from '../common/headers';
//import { Http, HttpModule } from '@angular/http';

//import { Observable } from 'rxjs/Rx';

//import { RouterLinkStubDirective } from '../../testing/router-stub';
//import { ClientsComponentStub } from '../../testing/clients/clients-stub';
//import { ClientService } from './client.service';
//import { Client } from './client';
//import { OAuthService } from 'angular2-oauth2/oauth-service';

//describe('ClientsComponent', () => {
//    let comp: ClientsComponentStub;
//    let fixture: ComponentFixture<ClientsComponentStub>;
//    let de: DebugElement;
//    let el: HTMLElement;
//    let clientSpy: jasmine.Spy;
//    let clients: Client[];
//    let clientService: ClientService;

//    beforeEach(async(() => {
//        TestBed.configureTestingModule({
//            imports: [
//                HttpModule
//            ],
//            declarations: [
//                ClientsComponentStub,
//                RouterLinkStubDirective
//            ],
//            providers: [
//                ClientService,
//                OAuthService
//            ]
//        })
//        .compileComponents()
//        .then(() => {
//            fixture = TestBed.createComponent(ClientsComponentStub);
//            comp = fixture.componentInstance;
//        })
//        .catch(e => console.log(e));
//    }));

//    it('pageTitle should be "test title"', () => {
//        const title = 'test title';
//        comp.pageTitle = title;
//        fixture.detectChanges();

//        de = fixture.debugElement.query(By.css('h2'));
//        el = de.nativeElement;

//        expect(el.textContent).toBe(title);
//    });
    
//    it('pageTitle should still be "Clients"', () => {
//        fixture.detectChanges();

//        const oldTitle = comp.pageTitle;
//        const title = 'test title';
//        comp.pageTitle = title;

//        de = fixture.debugElement.query(By.css('h2'));
//        el = de.nativeElement;

//        expect(el.textContent).toBe(oldTitle);
//    });

//    it('clients should be defined', () => {
//        fixture.detectChanges();

//        expect(comp.clients).toBeDefined();
//    });

//    it('getClients should be called on initialization', () => {
//        fixture.detectChanges();

//        expect(comp.clients.length).toBeGreaterThan(0);
//    });

//    it('clients should contain elements', () => {
//        fixture.detectChanges();

//        expect(comp.clients.length).toBeGreaterThan(0);
//    });

//    // nochm mit SK anschauen!
//    it('search function should find expected element', () => {
//        const term = 'one';
//        let expectedClient = new Client('1','1','client_one','flow_one');
//        fixture.detectChanges();

//        comp.searchClients(term);
//        fixture.detectChanges();
//        expect(comp.filteredClients).toContain(expectedClient);
//    });

//    it('should display same id in overview', () => {
//        let expectedClient = new Client('1','client_one','client one','flow_one');
        
//        comp.filteredClients = new Array<Client>();
//        comp.filteredClients.push(expectedClient);
//        fixture.detectChanges();

//        de = fixture.debugElement.query(By.css('.client_id'));
//        el = de.nativeElement;

//        expect(el.textContent).toBe(expectedClient.Id);
//    });

//    it('should display same name in overview', () => {
//        let expectedClient = new Client('1','client_one','client one','flow_one');
        
//        comp.filteredClients = new Array<Client>();
//        comp.filteredClients.push(expectedClient);
//        fixture.detectChanges();

//        de = fixture.debugElement.query(By.css('.client_name'));
//        el = de.nativeElement;

//        expect(el.textContent).toBe(expectedClient.Name);
//    });

//    it('should display same flow in overview', () => {
//        let expectedClient = new Client('1','client_one','client one','flow_one');
        
//        comp.filteredClients = new Array<Client>();
//        comp.filteredClients.push(expectedClient);
//        fixture.detectChanges();

//        de = fixture.debugElement.query(By.css('.client_flow'));
//        el = de.nativeElement;

//        expect(el.textContent).toBe(expectedClient.Flow);
//    });
//});