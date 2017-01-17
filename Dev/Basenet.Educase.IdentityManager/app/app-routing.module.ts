import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common/error-pages/pagenotfound.component';
import { AuthGuard } from './common/auth.guard';

import { ClientService } from './clients/client.service';

import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { HomeComponent } from './home/home.component';
import { ScopesComponent } from './scopes/scopes.component';
import { ScopeDetailComponent } from './scopes/scope-detail/scope-detail.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            pageTitle: 'Home',
            relevantForNav: 'false'
        }
    },
    {
        path: 'clients',
        component: ClientsComponent,
        data: {
            pageTitle: 'All Clients',
            navTitle: 'Clients',
            relevantForNav: 'true'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'client/:uid',
        component: ClientDetailComponent,
        data: {
            pageTitle: 'Client Detail',
            relevantForNav: 'false'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'scopes',
        component: ScopesComponent,
        data: {
            pageTitle: 'All Scopes',
            navTitle: 'Scopes',
            relevantForNav: 'true'
        },
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    },
    {
        path: 'scope/:uid',
        component: ScopeDetailComponent,
        data: {
            pageTitle: 'Scope Detail',
            relevantForNav: 'false'
        },
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/404',
        data: {
            relevantForNav: 'false'
        }
    },
    {
        path: '404',
        component: PageNotFoundComponent,
        data: {
            relevantForNav: 'false'
        }
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      ROUTES
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ClientService
  ]
})

export class AppRoutingModule {}