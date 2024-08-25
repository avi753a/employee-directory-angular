import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { NavigationService, toastAction, PageRoute } from '../../services/navigation.service';
import { EmployeeInfo, ContentService, Role } from '../../services/content.service';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss'
})
export class RoleFormComponent {
  employeesToUpdate:EmployeeInfo[]=[];
assignEmployee(emp:EmployeeInfo,eventTarget: EventTarget|null) {
  if((eventTarget as HTMLInputElement).checked){
    this.employeesToUpdate.push(emp);
  }
  else{
    let index=this.employeesToUpdate.indexOf(emp);
    this.employeesToUpdate.splice(index,1);
  }
}
updateEmployees(id:string){
  for(let emp of this.employeesToUpdate){
    emp.roleName=id;
    this.contentService.editEmployee(emp).subscribe({
      next:(data)=>{let complete=data}
    });
  }
}

  roleForm!: FormGroup;
  mode: string = "create";
  id!: string | null;
  isCreateMode = false;
  assignemployeeList!:EmployeeInfo[];
  roleId!:string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private contentService: ContentService, private navService: NavigationService) { }
  ngOnInit(): void {
    this.initFormModel();
    this.initParams();
    this.initForm()
  }

  get f() { return this.roleForm.controls; }
  submitted = false;
  onSubmit() {
    if(this.mode==="create"){
      this.contentService.createRole(this.roleForm.value).subscribe(
        {
          next:(data)=>{this.updateEmployees(data as string);
            this.navService.showToastSignal.set(toastAction.RoleCreated);
          },
          error:(msg)=>{
            this.navService.showToastSignal.set(toastAction.RoleFailed);
          }
        }
      );
    }
    else if(this.mode==="Edit"){
      let dataToSend=this.ConvertFormToRole(this.roleForm.value as RoleFormData,this.roleId)
      console.log("role is edited",dataToSend);
      this.contentService.editRole(dataToSend).subscribe({
        next:(data)=>{
          this.navService.showToastSignal.set(toastAction.RoleEdited);
        }
      });
    }
    this.submitted = true;
    if (this.roleForm.invalid) {
      return;
    }
  }
  //#region functions
  initFormModel(): void {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
    });
  }
  initParams(): void {
    this.route.queryParamMap.subscribe((params) => {
      let temp_mode = params.get("mode");
      if (temp_mode) {
        this.mode = temp_mode;
        this.id = params.get("id");
      }
    })

  }
  initForm() {
    if (this.mode == "create") {
      this.createForm();
    }
    else {
      this.fillForm();
    }
    this.initEmployees()
  }
  initEmployees(){
    this.contentService.getEmployeeData().subscribe({
      next:(data)=>{
        this.assignemployeeList=data;
      },
      error:(msg)=>{
          console.log(msg);
      }
    })
  }
  createForm() {
    this.isCreateMode = true;
    this.roleForm.get("dateOfJoining")?.setValue("    ");
  }
  fillForm() {
    if (this.id)
      this.contentService.fetchRoleDetails(this.id).subscribe(
        {
          next: (data) => {
            this.roleForm.patchValue(data);
            this.roleId=data.id;
          },
          error: (msg) => {
            console.log(msg);
            this.mode = "create";
            this.isCreateMode = true;
          }
        }
      )
  }
  onCancel() {
      this.navService.navigateToSignal.set(PageRoute.Role);
  }
  ConvertFormToRole(a:RoleFormData,id:string):Role{
    return new Role(id,a.name,a.department,a.description,a.location);
  }
  //#endregion
}
export class RoleFormData{
  name: string;
  department: string;
  description: string;
  location: string;

  constructor(roleName: string, department: string, description: string, location: string) {
    this.name = roleName;
    this.department = department;
    this.description = description;
    this.location = location;
  }
}