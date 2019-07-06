import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralContentComponent } from './general-content/general-content.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: 'main',
    component: GeneralContentComponent
  },
  {
    path: 'preregistration',
    component: RegistrationComponent
  },
  {
    path: 'rolemanagement',
    loadChildren: './rolemanagement/rolemanagement.module#RolemanagementModule'
  },

  {
    path: '',
    component: GeneralContentComponent
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
