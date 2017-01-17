//import { TestBed, async, ComponentFixture } from '@angular/core/testing';
//import { DebugElement } from '@angular/core';
//import { By } from '@angular/platform-browser';
//import { MockBackend } from '@angular/http/testing';
//import { Http, HttpModule } from '@angular/http';
//import { ScopesComponentStub } from '../../testing/scopes/scopes-stub';
//import { Scope } from './scope';
//import { ScopeService } from './scope.service';
//import { ScopeServiceStub } from '../../testing/scopes/scope.service.stub';
//import { Claim } from '../claims/claim';
//import { ClaimService } from '../claims/claim.service';
//import { ClaimServiceStub } from '../../testing/claims/claim.service.stub';
//import { RouterLinkStubDirective } from '../../testing/router-stub';
//describe('ScopesComponent', () => {
//    let comp: ScopesComponentStub;
//    let fixture: ComponentFixture<ScopesComponentStub>;
//    let de: DebugElement;
//    let el: HTMLElement;
//    let scopeService: ScopeService;
//    let claimService: ClaimService;
//    beforeEach(async(() => {
//        TestBed.configureTestingModule({
//            imports: [
//                HttpModule
//            ],
//            declarations: [
//                ScopesComponentStub,
//                RouterLinkStubDirective
//            ],
//            providers: [
//                { provide: ScopeService, useClass: ScopeServiceStub },
//                { provide: ClaimService, useClass: ClaimServiceStub }
//            ]
//        })
//        .compileComponents()
//        .then(() => {
//            fixture = TestBed.createComponent(ScopesComponentStub);
//            comp = fixture.componentInstance;
//        })
//        .catch(e => console.log(e));
//    }));
//    it('true is true', () => {
//        expect(true).toBe(true);
//    });
//    it('pageTitle should be "Scopes"', () => {
//        const title = "Scopes";
//        fixture.detectChanges();
//        expect(comp.pageTitle).toBe(title);
//    });
//    it('pageTitle should be "test title"', () => {
//        fixture.detectChanges();
//        const title = 'test title';
//        comp.pageTitle = title;
//        fixture.detectChanges();
//        expect(comp.pageTitle).toBe(title);
//    });
//    it('scopes should contain data', () => {
//        fixture.detectChanges();
//        expect(comp.scopes).toBeDefined();
//    });
//    it('search function should find expected scope(s)', () => {
//        const term = 'value';
//        var expectedScope1 = new Scope('seachvalue', 'seachvalue', 'seachvalue', 'seachvalue', false, new Array<Claim>());
//        var expectedScope2 = new Scope('value', 'value', 'value', 'value', false, new Array<Claim>());
//        var expectedScopes = new Array<Scope>();
//        expectedScopes.push(expectedScope1);
//        expectedScopes.push(expectedScope2);
//        fixture.detectChanges();
//        comp.scopes = expectedScopes;
//        fixture.detectChanges();
//        comp.searchScopes(term);
//        fixture.detectChanges();
//        expect(comp.filteredScopes).toContain(expectedScope2);
//    });
//    it('should display the right name', () => {
//        const value = 'name';
//        fixture.detectChanges();
//        comp.scopes = [
//            new Scope('seachvalue', value, 'seachvalue', 'seachvalue', false, new Array<Claim>())
//        ];
//        comp.filteredScopes = comp.scopes;
//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            de = fixture.debugElement.query(By.css('.scope_name'));
//            el = de.nativeElement;
//            expect(el.textContent).toBe(value)
//        })
//        .catch(e => console.log(e));
//    });
//    it('should display the right displayname', () => {
//        const value = 'displayname';
//        fixture.detectChanges();
//        comp.scopes = [
//            new Scope('seachvalue', 'seachvalue', value, 'seachvalue', false, new Array<Claim>())
//        ];
//        comp.filteredScopes = comp.scopes;
//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            de = fixture.debugElement.query(By.css('.scope_displayname'));
//            el = de.nativeElement;
//            expect(el.textContent).toBe(value)
//        })
//        .catch(e => console.log(e));
//    });
//    it('should display the right type', () => {
//        const value = 'type';
//        fixture.detectChanges();
//        comp.scopes = [
//            new Scope('seachvalue', 'seachvalue', 'seachvalue', value, false, new Array<Claim>())
//        ];
//        comp.filteredScopes = comp.scopes;
//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            de = fixture.debugElement.query(By.css('.scope_type'));
//            el = de.nativeElement;
//            expect(el.textContent).toBe(value)
//        })
//        .catch(e => console.log(e));
//    });
//    it('should display the right value of isRequired', () => {
//        const value = true;
//        fixture.detectChanges();
//        comp.scopes = [
//            new Scope('seachvalue', 'seachvalue', 'seachvalue', 'seachvalue', value, new Array<Claim>())
//        ];
//        comp.filteredScopes = comp.scopes;
//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            de = fixture.debugElement.query(By.css('.scope_isrequired'));
//            el = de.nativeElement;
//            expect(el.textContent).toBe(value.toString())
//        })
//        .catch(e => console.log(e));
//    });
//}) 
//# sourceMappingURL=scopes.component.spec.js.map