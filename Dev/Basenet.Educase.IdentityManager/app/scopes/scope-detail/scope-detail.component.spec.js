//import { TestBed, async, ComponentFixture } from '@angular/core/testing';
//import { RouterTestingModule } from '@angular/router/testing';
//import { ActivatedRoute, Params } from '@angular/router';
//import { DebugElement } from '@angular/core';
//import { FormsModule } from '@angular/forms';
//import { By } from '@angular/platform-browser';
//import { Subject } from 'rxjs/Subject';
//import { ScopeDetailComponentStub } from '../../../testing/scopes/scope-detail/scope-detail.stub';
//import { Scope } from '../scope';
//import { ScopeService } from '../scope.service';
//import { ScopeServiceStub } from '../../../testing/scopes/scope.service.stub';
//import { Claim } from '../../claims/claim';
//import { ClaimService } from '../../claims/claim.service';
//import { ClaimServiceStub } from '../../../testing/claims/claim.service.stub';
//import { ActivatedRouteStub, RouterLinkStubDirective } from '../../../testing/router-stub';;
//describe('ScopeDetailComponent', () => {
//    let comp: ScopeDetailComponentStub;
//    let fixture: ComponentFixture<ScopeDetailComponentStub>;
//    let de: DebugElement;
//    let el: HTMLElement;
//    let inputEl: HTMLInputElement;
//    let params: Subject<Params>;
//    let expectedScope: Scope;
//    let activatedRoute: ActivatedRouteStub;
//    beforeEach(async(() => {
//        params = new Subject<Params>();
//        TestBed.configureTestingModule({
//            imports: [
//                FormsModule,
//                RouterTestingModule
//            ],
//            declarations: [
//                ScopeDetailComponentStub,
//                RouterLinkStubDirective
//            ],
//            providers: [
//                { provide: ScopeService, useClass: ScopeServiceStub },
//                { provide: ClaimService, useClass: ClaimServiceStub }
//            ]
//        })
//        .compileComponents()
//        .then(() => {
//            fixture = TestBed.createComponent(ScopeDetailComponentStub);
//            comp = fixture.componentInstance;
//        })
//        .catch(e => console.log(e))
//    }));
//    it('new scope should be defined', () => {
//        const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
//        fixture.detectChanges();
//        comp.scopeUid = EMPTY_GUID;
//        fixture.detectChanges();
//        fixture.whenStable().then(() => {
//            expect(comp.scope).toBeDefined();
//        })
//    });
//    it('should contain the name of the scope', async(() => {
//        const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
//        const name = 'Name';
//        fixture.detectChanges();
//        comp.scopeUid = EMPTY_GUID;
//        fixture.detectChanges();
//        fixture.whenStable().then(() => {
//            comp.scope.Name = name;
//            fixture.detectChanges();
//            // de = fixture.debugElement.query(By.css('.scopedetail_name'));
//            // inputEl = de.nativeElement;
//            expect(comp.scope.Name).toBe(name);
//        })
//        .catch(e => console.log(e));
//    }));
//    it('should contain the displayname of the scope', async(() => {
//        fixture.detectChanges();
//        const displayName = 'DisplayName';
//        fixture.whenStable().then(() => {
//            comp.scope.DisplayName = displayName;
//            fixture.detectChanges();
//            // de = fixture.debugElement.query(By.css('.scopedetail_displayname'));
//            // inputEl = de.nativeElement;
//            expect(comp.scope.DisplayName).toBe('DisplayName');
//        })
//        .catch(e => console.log(e));
//    }));
//    it('should contain the type of the scope', async(() => {
//        fixture.detectChanges();
//        fixture.whenStable().then(() => {    
//            comp.scope.ScopeType = 'Resource';
//            fixture.detectChanges();
//            // de = fixture.debugElement.query(By.css('select'));
//            // el = de.nativeElement;
//            expect(comp.scope.ScopeType).toBe('Resource');
//        })
//        .catch(e => console.log(e));
//    }));
//    it('should contain the value of isRequired of the scope', async(() => {
//        fixture.detectChanges();
//        fixture.whenStable().then(() => {
//            comp.scope.IsRequired = true;
//            fixture.detectChanges();
//            // de = fixture.debugElement.query(By.css('.scopedetail_isrequired'));
//            // inputEl = de.nativeElement;
//            expect(comp.scope.IsRequired).toBe(true);
//        })
//        .catch(e => console.log(e));
//    }));
//    it('laims should be defined', () => {
//        fixture.detectChanges();
//        expect(comp.claims).toBeDefined();
//    });
//    it('assignedClaims should be defined', () => {
//        fixture.detectChanges();
//        expect(comp.assignedClaims).toBeDefined();
//    });
//    it('should update scope on Save call', () => {
//        fixture.detectChanges();
//        fixture.whenStable().then(() => {
//            const containingValue = '_updated';
//            comp.scope = new Scope('','name','Name','', false, null);
//            comp.save();
//            fixture.detectChanges();
//            expect(comp.scope.Name).toContain(containingValue);
//        })
//        .catch(e => console.log(e));
//    });
//}) 
//# sourceMappingURL=scope-detail.component.spec.js.map