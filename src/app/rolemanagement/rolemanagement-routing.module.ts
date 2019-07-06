import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolemanagementComponent } from './rolemanagement.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {
    path:'',
    component:RolemanagementComponent,

    children:[{
      path:'',
      redirectTo:'roles',
      pathMatch:'full'
    },
    {
      path:'roles',
      component:RolesComponent
    }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolemanagementRoutingModule { }
