import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  { path: 'home/comments/:id', loadChildren: './home/comments/comments.module#CommentsPageModule' , canActivate: [AuthGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home/details/:id', loadChildren: './home/boletim-details/boletim-details.module#BoletimDetailsPageModule'},
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'subscription', loadChildren: './subscription/subscription.module#SubscriptionPageModule' },
  { path: 'publisher-details/:id', loadChildren: './publisher-details/publisher-details.module#PublisherDetailsPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
