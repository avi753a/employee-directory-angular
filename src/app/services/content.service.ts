import { HttpClient } from '@angular/common/http';
import { Injectable,signal,computed } from '@angular/core';
import { Console } from 'console';
import { sign } from 'crypto';
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ContentService{

  constructor(private http:HttpClient) { }
  employeePafeInfo=new PageInfo("Employees","Find all of yours company's employee accounts and their associated Roles","ADD EMPLOYEE",true);
  rolePageInfo=new PageInfo("Roles","All the Roles are configured here","ADD ROLE",false)

  getEmployeeData():Observable<any>{
    return this.http.get("https://localhost:7259/Employees");
  }
  getRoleData():Observable<any>{
    return this.http.get("https://localhost:7259/Roles");
  }
  deleteSingleEmployee(id:string){
    return this.http.delete("https://localhost:7259/Employees/"+id);
  }
  fetchEmployeeDetails(id:string):Observable<any>{
    return this.http.get("https://localhost:7259/Employees/"+id);
  }
  fetchRoleDetails(id:string):Observable<any>{
    return this.http.get("https://localhost:7259/Roles/"+id);
  }
  createEmployee(emp:EmployeeInfo){
    let empRegister=new EmployeeRegistration(emp.firstName,emp.lastName,emp.dateOfBirth,emp.emailId,emp.mobileNo,emp.location,emp.roleName,emp.department,emp.managerName,emp.projectName,emp.imageUrl);
    console.log(empRegister);
    return this.http.post("https://localhost:7259/Employees",empRegister);
  }
  createRole(role:Role){
    console.log(role);
    return this.http.post("https://localhost:7259/Roles",role);
  }
  editEmployee(emp:EmployeeInfo){
    return this.http.put("https://localhost:7259/Employees/"+emp.id,emp);
  }
  editRole(role:Role){
    console.log("kept updated role");
    return this.http.put("https://localhost:7259/Roles/"+role.id,role);
  }
 
  letterFilterSignal=signal<string>("");
  letterFilterComputed=computed(()=>this.letterFilterSignal());
  filterSignal=signal<FilterModel|null>(null);
  filterComputed=computed(()=>this.filterSignal());
  hideStatusSignal=signal(false);
  hideStatusComputed=computed(()=>this.hideStatusSignal());
  downloadCSVSignal=signal(false);
  downloadCSVComputed=computed(()=>this.downloadCSVSignal())
}
export class PageInfo{
  constructor(
    public pageHeading?: string,
    public pageDescription?: string,
    public pageAddButtonName?: string,
    public pageIsExportable?:boolean){}
}
export class EmployeeInfo {
  [key: string]: string | number; 
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: string,
    public emailId: string,
    public mobileNo: string,
    public dateOfJoining: string,
    public location: string,
    public roleName: string,
    public department: string,
    public managerName: string,
    public projectName: string,
    public imageUrl: string
  ) {}  }
 
 export class Role {
  id: string;
  name: string;
  department: string;
  description: string;
  location: string;

  constructor(id: string, roleName: string, department: string, description: string, location: string) {
    this.id = id;
    this.name = roleName;
    this.department = department;
    this.description = description;
    this.location = location;
  }
}
export class EmployeeRegistration{
  constructor(
    public firstName: string,
    public lastName: string,
    public dateOfBirth: string,
    public emailId: string,
    public mobileNo: string,
    public location: string,
    public roleName: string,
    public department: string,
    public managerName: string,
    public projectName: string,
    public imageUrl: string
  ) {}
}
export class FilterModel{
  constructor(
    public statusList:string[],
    public LocationList:string[],
    public DepartmentList:string[],
  ){}
}