import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ListsComponent } from './Components/lists/lists.component';
import { MemberDetailComponent } from './Components/Members/member-detail/member-detail.component';
import { MemberListComponent } from './Components/Members/member-list/member-list.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { authgaurdGuard } from './routeGaurds/authgaurd.guard';

const routes: Routes = [
  {path:'', component : HomeComponent},
  {path : '',
    canActivate : [authgaurdGuard],
    children : [
      {path:'lists', component : ListsComponent},
  //here the authGaurd redirects to the authGaurd.gaurd.ts and checks for this canactivate method
  {path:'members', component : MemberListComponent},
  {path:'members/:id', component : MemberDetailComponent},
  {path:'messages', component : MessagesComponent},
    ]
  },
  {path:'**', component : HomeComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
