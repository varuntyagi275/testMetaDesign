import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './employee/add/add.component';
import { ListComponent } from './employee/list/list.component';

const routes: Routes = [{
  path:'',
  pathMatch:'full',
  redirectTo:'home'
},{
  path:'home',
  component:ListComponent
},
{
  path:'add',
  component:AddComponent
},
{
  path:'edit',
  component:AddComponent
},
{path:'**',
redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
