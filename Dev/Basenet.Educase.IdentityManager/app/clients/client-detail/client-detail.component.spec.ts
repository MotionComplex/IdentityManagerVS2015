//import { TestBed, async, ComponentFixture } from '@angular/core/testing'
//import { DebugElement } from '@angular/core';
//import { By } from '@angular/platform-browser';
//import { FormsModule } from '@angular/forms';
//import { RouterLinkStubDirective, ActivatedRouteStub } from '../../../testing/router-stub';

//import { ClientDetailComponentStub } from '../../../testing/clients/client-detail/client-detail.stub';
//import { Client } from '../client';
//import { Mandator } from '../../mandator/mandator';
//import { ClientService } from '../client.service';
//import { MandatorService } from '../../mandator/mandator.service';

//export const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

//describe('ClientDetailComponent', () => {
//    let comp: ClientDetailComponentStub;
//    let fixture: ComponentFixture<ClientDetailComponentStub>;
//    let de: DebugElement;
//    let el: HTMLElement;
//    let inputEl: HTMLInputElement;
//    let clientService: ClientService;
//    let mandatorService: MandatorService;
//    let gotoSpy: jasmine.Spy;

//    beforeEach(async(() => {
//        TestBed.configureTestingModule({
//            imports: [
//                FormsModule
//            ],
//            declarations: [
//                ClientDetailComponentStub
//            ],
//            providers: [
//                ClientService,
//                MandatorService,
//                RouterLinkStubDirective,
//                ActivatedRouteStub
//            ]
//        })
//        .compileComponents()
//        .then(() => {
//            fixture = TestBed.createComponent(ClientDetailComponentStub);
//            comp = fixture.componentInstance;
//        })
//        .catch(e => console.log(e));
//    }));

//    it('new client should be defined', () => {
//        const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
//        fixture.detectChanges();
        
//        comp.clientUid = EMPTY_GUID;

//        fixture.detectChanges();
//        fixture.whenStable().then(() => {
//            expect(comp.client).toBeDefined();
//        })
//    });
    
//    it('should contain the id of the client', async(() => {
//        const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
//        fixture.detectChanges();
        
//        comp.clientUid = EMPTY_GUID;

//        fixture.detectChanges();
//        fixture.whenStable().then(() => {
//            comp.client.Id = 'iddd'
//            fixture.detectChanges();

//            expect(comp.client.Id).toBe('iddd')
//        })
//    }));
        
//    it('should contain the name of the client', async(() => {
//        const name = 'test name';
//        const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
//        fixture.detectChanges();
        
//        comp.clientUid = EMPTY_GUID;

//        fixture.detectChanges();
//        fixture.whenStable().then(() => {
//            comp.client.Name = name
//            fixture.detectChanges();

//            expect(comp.client.Name).toBe(name)
//        })
//    }));
    
//    it('should contain the flow of the client', async(() => {
//        fixture.detectChanges();
//        const flow = 'AuthorizationCode';

//        fixture.whenStable().then(() => {
//            comp.client.Flow = flow;
//            fixture.detectChanges();

//            expect(comp.client.Flow).toContain(flow);
//        })
//    }));

//    it('mandators should be defined', () => {
//        fixture.detectChanges();

//        expect(comp.mandators).toBeDefined();
//    });

//    it('assignedMandators should be defined', () => {
//        fixture.detectChanges();

//        expect(comp.assignedMandators).toBeDefined();
//    });

//    it('should check if alert states are defined', () => {
//        fixture.detectChanges();

//        expect(!comp.isSuccessful && !comp.isError).toBe(true);
//    });

//    it('should check if checkAllMandators checks all mandators', () => {
//        fixture.detectChanges();

//        comp.checkAllMandators();
//        fixture.detectChanges();

//        expect(comp.mandators.filter(m => !m.IsChecked).length).toBe(0);
//    });

//    it('should update client on Save call', () => {
//        fixture.detectChanges();
//        fixture.whenStable().then(() => {
//            const containingValue = '_updated';
//            comp.client = new Client('','','Name','');
//            comp.save();
            
//            fixture.detectChanges();

//            expect(comp.client.Name).toContain(containingValue);
//        })
//        .catch(e => console.log(e));
//    });
//});