import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { GlobalService } from 'src/global';
import { rolesList, modularData } from '../../sampledata';
import { MapmodulePipe } from 'src/app/pipes/mapmodule.pipe';

@Component({
  selector: 'ngx-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [MapmodulePipe]
})

export class RolesComponent implements OnInit {
  loading: boolean = false;
  currentPage = 0
  totalPages = 0;
  hello = true;
  editCheck: boolean = false;
  addCheck: boolean = false;
  viewCheck: boolean = false;
  showTable: boolean = true;
  heading;
  editroleData = {
    role_id: '',
    role_name: '',
    role_desc: '',
    modules: []
  };
  searchString: '';
  roleData = []
  modules = [];
  rolesModule = {}
  copyRoleModules = []
  moduleData = [];
  pipe_res = []
  status = localStorage.getItem('activeStatus') || 'A'
  isRolenameExists = false;
  val = []
  selectedAll = false;
  toasterConfiguration = {
    position: 'top-full-width',
    animate: 'slideFromTop',
    showCloseButton: true,
    maxShown: 2,
    toastTimeout: 5000
  }
  constructor(private http: HttpClient, public global: GlobalService, private router: Router, private convertFormat: MapmodulePipe,
  ) {

  }

  ngOnInit() {
    this.getRoles('A');

  }


  getRoles(status) {
    this.status = status;
    if (localStorage.getItem('activeStatus') && localStorage.getItem('activeStatus') == this.status) {

    } else {
      this.setToInitial()
      localStorage.setItem('activeStatus', status);
    }
    // const head = new HttpHeaders({ status: status });
    this.rolesModule = {}
    // this.http.get(http call to fetch roles

    this.roleData = [...rolesList]
    this.pipe_res = [...rolesList]
    this.moduleData = [...modularData]
    for (let i = 0; i < this.moduleData.length; i++) {
      this.moduleData[i]['checked'] = false;
      this.rolesModule[this.moduleData[i].module_id] = { "itemName": this.moduleData[i].module_name, "checked": false }
    }
    this.copyRoleModules = [...this.moduleData]
    console.log('copu', this.copyRoleModules)
    this.fillTable(status)

    // })
  }

  getMoreRecords(event) {
    console.log('event-', event)
    this.currentPage = event.currentPage;
    this.totalPages = event.totalPages
    this.getRoles(this.status);
  }

  fillTable(status) {
    // console.log('pipe_res 111', this.pipe_res)
    for (var i = 0; i < this.roleData.length; i++) {
      this.val = []
      this.val = this.convertFormat.transform(this.roleData[i].module_id, this.moduleData)
      if (this.roleData[i].role_name.replace(/\s/g, '').toLowerCase() == 'superadmin' || status == 'I') {
        this.pipe_res[i]['params'] = [
          { 'class': 'btn btn-small', 'icon_class': 'far fa-eye', 'name': 'view', 'functionality': 'view_roles' }]
      }
      else if (this.roleData[i].role_name.replace(/\s/g, '').toLowerCase() != 'superadmin') {
        this.pipe_res[i]['params'] = [
          { 'class': 'btn btn-small', 'icon_class': 'far fa-eye', 'name': 'view', 'functionality': 'view_roles' },
          { 'class': 'btn btn-small mx-3', 'icon_class': 'fa fa-pen', 'name': 'edit', 'functionality': 'edit_roles' },
          // { 'class': 'btn btn-small', 'icon_class': 'far fa-trash-alt', 'name': 'delete', 'functionality': 'delete_roles' }
        ]

      }
      if (this.val.length >= 2) {
        if (this.val.length == 2) {
          this.pipe_res[i]['modules'] = [this.val[0].name, this.val[1].name]
        }
        else {
          this.pipe_res[i]['modules'] = [this.val[0].name, this.val[1].name, "+" + (this.val.length - 2)]
        }
      }
      else if (this.val.length == 1) {
        this.pipe_res[i]['modules'] = [this.val[0].name]
      }
    }

  }

  clearData() {
    this.editroleData = {
      role_id: '',
      role_name: '',
      role_desc: '',
      modules: []
    }
    this.moduleData = [...this.copyRoleModules]
  }

  addrole() {
    this.clearData();
    this.editroleData.modules = [];
    this.heading = 'roleManagementComponent.addRole'
    this.showTable = false;
    this.editCheck = false;
    this.viewCheck = false;
    console.log('editchceck', this.editCheck, 'viewcheck', this.viewCheck)
  }
  currentRow
  editTab(row) {
    this.moduleData = [...this.copyRoleModules]
    console.log('this is edittab', row)
    this.heading = 'roleManagementComponent.editRole'
    this.showTable = false;
    this.editCheck = true;
    this.viewCheck = false;
    this.editroleData.modules = []
    var item = this.roleData.find(item =>
      item.role_id === row.value.role_id
    )
    this.editroleData.role_id = item.role_id;
    this.editroleData.role_name = item.role_name;
    this.editroleData.role_desc = item.role_desc;
    let moduleIds = item.module_id.split(',')
    console.log('module ids', moduleIds)
    setTimeout(() => {
      for (let i = 0; i < this.moduleData.length; i++) {
        if (moduleIds.indexOf(String(this.moduleData[i].module_id)) != -1) {
          console.log('this is inside')
          this.moduleData[i].checked = true;
        }
      }
    })
  }
  navigateToEdit() {
    this.editTab(this.currentRow)
  }
  viewTab(row) {
    this.currentRow = row;
    console.log('this is viewtab', row)
    this.heading = 'roleManagementComponent.viewRole'
    this.viewCheck = true;
    this.showTable = false;
    this.editroleData.modules = []
    this.listCheck = new Array(this.moduleData.length);
    this.listCheck.fill(false)
    var item = this.roleData.find(item =>
      item.role_id === row.value.role_id
    )
    this.editroleData.role_id = item.role_id;
    this.editroleData.role_name = item.role_name;
    this.editroleData.role_desc = item.role_desc;
    this.modules = this.convertFormat.transform(item.module_id, this.moduleData)
    for (var i = 0; i < this.modules.length; i++) {
      let index = this.moduleData.findIndex(item => item.module_id == this.modules[i].id)
      this.listCheck[index] = true
      this.editroleData.modules.push({ "id": this.modules[i].id, "itemName": this.modules[i].name })
    }
    this.modules = this.convertFormat.transform(item.module_id, this.moduleData)

    for (var i = 0; i < this.modules.length; i++) {
      this.editroleData.modules.push({ "id": this.modules[i].id, "itemName": this.modules[i].name })
    }
    console.log('editchceck', this.editCheck, 'viewcheck', this.viewCheck)
  }

  selectAll() {

    if (this.selectedAll) {
      for (let i = 0; i < this.moduleData.length; i++) {
        this.moduleData[i].checked = true
      }

    } else {
      for (let i = 0; i < this.moduleData.length; i++) {
        this.moduleData[i].checked = false
      }

    }
  }

  save() {

    let modulesChecked = []
    for (let i = 0; i < this.moduleData.length; i++) {
      if (this.moduleData[i].checked == true) {
        modulesChecked.push(this.moduleData[i].module_id)
      }
    }
    if (this.editCheck) {
      //this is the edit logic
    }
    else if (!this.editCheck) {
      // this.http.post(`${environment.baseurl}` + 'role/addRoles',
      this.roleData.push({
        modules: modulesChecked,
        role_name: this.editroleData.role_name,
        role_desc: this.editroleData.role_desc,
        approved_by: localStorage.getItem('userID'),
        created_by: localStorage.getItem('userID')
      })

    }
    console.log('edit check', this.editCheck)
    this.selectedAll = false;
    this.showTable = true;
    this.fillTable(this.status)
  }
  listCheck;
  cancel(dirtyCheck) {
    if (dirtyCheck) {
      alert('you changes will be gone if you cancel')
    }
    else {
      this.showTable = true;
    }

    // this.getRoles('A')
  }

  availableRoles(event) {
    console.log('Key event', event)
    var existingRoles = this.roleData.map(roles => roles.role_name)
    if (existingRoles.includes(this.editroleData.role_name)) {
      this.isRolenameExists = true
    }
    else {
      this.isRolenameExists = false
    }
  }

  test(event) {
    console.log('event', event)
  }



  setToInitial() {
    this.roleData = [];
    this.moduleData = [];
    this.pipe_res = [];
    this.currentPage = 0
    this.totalPages = 0;
  }
  ngOnDestroy() {
    localStorage.removeItem('activeStatus')
  }

}
