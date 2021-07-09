import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list/restaurant-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuard } from './guard/auth.guard';

import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'restaurants',
    // canActivate: [AuthGuard],
    component: RestaurantListComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'add-users',
    component: UserAddComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
