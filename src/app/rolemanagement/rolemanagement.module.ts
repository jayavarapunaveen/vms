import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolemanagementComponent } from './rolemanagement.component'
import { RolesComponent } from './roles/roles.component';
import { RolemanagementRoutingModule } from './rolemanagement-routing.module'
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../table/table.component';
import { MultiSelectFilterPipe, TablefilterPipe } from '../pipes/tablefilter.pipe';
import { MapmodulePipe } from '../pipes/mapmodule.pipe';


@NgModule({
  declarations: [
    RolemanagementComponent,
    RolesComponent,
    TableComponent,
    MultiSelectFilterPipe,
    TablefilterPipe,
    
    // TableComponent
  ],
  imports: [
    // AngularMultiSelectModule,
    FormsModule,
    CommonModule,
    RolemanagementRoutingModule,

  ],
  providers: []
})
export class RolemanagementModule { }