/*import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponentStub } from './../testing/home/home-stub';

import { RouterLinkStubDirective } from '../testing/router-stub';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let comp: AppComponent;
    let linkDes: DebugElement[];
    let links: RouterLinkStubDirective[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpModule
            ],
            declarations: [
                AppComponent, 
                RouterLinkStubDirective,
                NavigationComponent,
                HomeComponentStub
            ]
        })
        .compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(AppComponent);
            comp = fixture.componentInstance;

            linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
            links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective); 
        })
    }))

    it('pageTitle should be "IdentityManager 2017"', () => {
        fixture.detectChanges();
        
        expect(comp.pageTitle).toBe('IdentityManager 2017');
    })

    it('can get RouterLinks from template', () => {
        expect(links.length).toBe(1);
    })
})*/