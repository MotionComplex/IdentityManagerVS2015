//import { TestBed, async, ComponentFixture } from '@angular/core/testing';
//import { By } from '@angular/platform-browser';
//import { DebugElement } from '@angular/core';

//import { OAuthService } from 'angular2-oauth2/oauth-service';
//import { LoginService } from '../login/login.service';

//import { RouterLinkStubDirective } from '../../testing/router-stub';
//import { HomeComponentStub } from '../../testing/home/home-stub';

//describe('HomeComponent', () => {
//    let comp: HomeComponentStub;
//    let fixture: ComponentFixture<HomeComponentStub>;
//    let de: DebugElement;
//    let el: HTMLElement;
//    let spy: jasmine.Spy;
        
//    beforeEach(async(() =>{
//        TestBed.configureTestingModule({
//            declarations: [
//                HomeComponentStub,
//                RouterLinkStubDirective,
//            ]
//        })
//        .compileComponents()
//        .then(() => {
//            fixture = TestBed.createComponent(HomeComponentStub);

//            comp = fixture.componentInstance;

//            fixture.detectChanges();
//            let linkDes = fixture.debugElement
//                .queryAll(By.directive(RouterLinkStubDirective));

//            let links = linkDes
//                .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

//        });
//    }));

//    it('pageTitle should be "test title"', () => {
//        const title = 'test title';

//        comp.pageTitle = title;
//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
//            de = fixture.debugElement.query(By.css('h2'));
//            el = de.nativeElement;

//            expect(el.textContent).toBe(title)
//        });
//    });

//    it('user is logged in', () => {
//        expect(comp.loggedIn).toBe(true);
//    });

//    it('should show login warning if no user is logged in', () => {
//        comp.loggedIn = false;
        
//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
            
//            de = fixture.debugElement.query(By.css('.alert'));
//            el = de.nativeElement;
        
//            expect(el).toBeDefined();
//        });

//    });

//    it('should show container box(es) with link to the different functionalities if user is logged in', () => {
//        comp.loggedIn = true;
        
//        fixture.whenStable().then(() => {
//            fixture.detectChanges();
    
//            de = fixture.debugElement.query(By.css('.thumbnail'));
//            el = de.nativeElement;

//            expect(el).toBeDefined();
//        });
//    });

//    it('clients should be defined', () => {
//        expect(comp.clients).toBeDefined();
//    });
//});
