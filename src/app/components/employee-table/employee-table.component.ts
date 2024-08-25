import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren, effect} from '@angular/core';
import { Router } from '@angular/router';
import { privateDecrypt } from 'crypto';
import { LetterBarComponent } from '../letter-bar/letter-bar.component';
import { CommonModule } from '@angular/common';
import { NavigationParams, NavigationService, PageRoute, toastAction } from '../../services/navigation.service';
import { ContentService, EmployeeInfo } from '../../services/content.service';
import { ZoomDirective } from '../../directives/zoom.directive';


@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule,ZoomDirective],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent implements OnInit {

  ngOnInit(): void {
    this.loadEmployees();
    this.contentService.hideStatusSignal.set(false);
  }

  constructor(private contentService: ContentService, private navigationService: NavigationService,private renderer:Renderer2,private router:Router) 
  {
    effect(()=>{
      let value=this.contentService.letterFilterComputed();
      if (value === "") {
        this.employeeList = this.baseEmployeeList;
      }
      else {
        this.employeeList=this.baseEmployeeList;
        this.employeeList=this.employeeList.filter((emp) => {
          return (emp.firstName.toUpperCase()).startsWith(value);
        });
      }
    })
    effect(()=>{
      this.contentService.downloadCSVComputed();
      this.exportData();
    })
    effect(()=>{
      let value=this.contentService.filterComputed();
      this.employeeList=this.baseEmployeeList;
        if (value === null) {
          this.employeeList = this.baseEmployeeList;
          return;
        }
        if(value.LocationList.length!==0){
          this.employeeList=this.employeeList.filter((emp)=>{
            return value?.LocationList.includes(emp.location);
          })
        }
        if(value.DepartmentList.length!==0){
          this.employeeList=this.employeeList.filter((emp)=>{
            return value?.DepartmentList.includes(emp.department);
          })
        }
    })
   }
  baseEmployeeList!: EmployeeInfo[];
  employeeList!: EmployeeInfo[];
  errorMesssage=false;
  // unfilteredData=this.baseEmployeeList;
  @ViewChildren('selectcoloumn') checkboxes!: QueryList<ElementRef>;

 
  viewEmployee(id: string) {
    let empParams = new NavigationParams(PageRoute.EmployeeForm, "View", id);
    this.navigationService.navigateParamSignal.set(empParams);
  }
  editEmployee(id: string) {
    let empParams = new NavigationParams(PageRoute.EmployeeForm, "Edit", id);
    this.navigationService.navigateParamSignal.set(empParams);
  }
  
  private sortByAsecName = true;
  sortByName() {
    if (this.sortByAsecName == true) {
      this.employeeList.sort((a, b) => a.firstName.localeCompare(b.firstName));
      this.sortByAsecName = false;
    }
    else {
      this.sortByAsecName = true;
      this.employeeList.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }
  }
  private sortByLocAsec = true;
  sortByLocation() {
    if (this.sortByLocAsec == true) {
      this.employeeList.sort((a, b) => a.location.localeCompare(b.location));
      this.sortByLocAsec = false;
    }
    else {
      this.sortByLocAsec = true;
      this.employeeList.sort((a, b) => b.location.localeCompare(a.location));
    }
  }
  private sortByDepAsec = true;
  sortByDepartment() {
    if (this.sortByDepAsec) {
      this.employeeList.sort((a, b) => a.department.localeCompare(b.department));
      this.sortByDepAsec = false;
    }
    else {
      this.sortByDepAsec = true;
      this.employeeList.sort((a, b) => b.department.localeCompare(a.department));
    }
  }
  private sortByRoleAsec = true;
  sortByRole() {
    if (this.sortByRoleAsec) {
      this.employeeList.sort((a, b) => a.roleName.localeCompare(b.roleName));
      this.sortByRoleAsec = false;
    }
    else {
      this.sortByRoleAsec = true;
      this.employeeList.sort((a, b) => b.roleName.localeCompare(a.roleName));
    }
  }
  private sortByIdAsec = true;
  sortById() {
    if (this.sortByIdAsec) {
      this.sortByIdAsec = false;
      this.employeeList.sort((a, b) => a.id.localeCompare(b.id));
    }
    else {
      this.sortByIdAsec = true;
      this.employeeList.sort((a, b) => b.id.localeCompare(a.id));
    }
  }
  private sortByDateAsec = true;
  sortByJoinDt() {
    if (this.sortByDateAsec) {
      this.sortByDateAsec = false;
      this.employeeList.sort((a, b) => a.dateOfJoining.localeCompare(b.dateOfJoining));
    }
    else {
      this.sortByDateAsec = true;
      this.employeeList.sort((a, b) => b.dateOfJoining.localeCompare(a.dateOfJoining));
    }
  }
  selectedEmployees:string[]=[];
  selectEmployee(id:string,event:Event){
    if((event.target as HTMLInputElement).checked){
      this.selectedEmployees.push(id);
    }
    else{
      let index=this.selectedEmployees.indexOf(id);
      this.selectedEmployees.splice(index,1);
    }
  }
  selectAll(event:Event){
    let mastervalue=(event.target as HTMLInputElement).checked;
    this.checkboxes.forEach(checkboxRef => {
      const checkbox = checkboxRef.nativeElement; 
        this.renderer.setProperty(checkbox, 'checked', mastervalue);
    });
    if(mastervalue){
     this.selectedEmployees = this.employeeList.map(employee => employee.id);
    }
    else{
      this.selectedEmployees=[];
    }
  }
  deleteMultiple(){
    this.selectedEmployees.forEach(element => {
      this.deleteEmployee(element);
    });
  }
  deleteEmployee(id: string) {
    this.contentService.deleteSingleEmployee(id).subscribe({
      next:(data)=>{
        // this.navigationService.showToastSignal.set(toastAction.EmployeeDeleted);
      }
    });
    this.loadEmployees();
  }
  loadEmployees(){
    this.contentService.getEmployeeData().subscribe({
      next: (data) => {
        this.baseEmployeeList = data;
        this.employeeList = this.baseEmployeeList;
      },
      error: (errorMsg) => {
        console.error('Error fetching data:', errorMsg);
        if(errorMsg.status==401){
            this.errorMesssage=true;
            this.navigationService.showToastSignal.set(toastAction.LoginFail);
        }
        // this.router.navigate(['/loginform']);
      },
      
    });
  }
  exportData(): void {
    const data:EmployeeInfo[] = this.baseEmployeeList;
    if(data){
    const employeeDataString: string = data.map(emp => Object.keys(emp).map(key => emp[key]).join(",")).join("\n");
    const csvString: string = `id,firstName,lastName,dateOfBirth,emailId,mobileNo,joiningDate,location,jobTitle,department,manager,project,ImageUrl\n` +
      employeeDataString;
  
    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    console.log(link.href);
    link.download = 'employee_data.csv';
    link.click();
    window.URL.revokeObjectURL(link.href);
    }
  }
}




