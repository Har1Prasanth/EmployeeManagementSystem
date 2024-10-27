import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger } from '@angular/animations';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent implements OnInit {
  userRole: string | null = null;

  employees: Employee[] = [];
  showEmployeeForm: Boolean = false;
  employeeForm: FormGroup;
  isUpdate = false;
  selectedEmployee: Employee | null = null

  ngOnInit(): void {
    this.userRole = this.authService.getRole()
    this.loadEmployees();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loadEmployees() {
    this.employeeService
      .fetchAllEmployees()
      .subscribe((employees: Employee[]) => {
        console.log('employees', employees);
        this.employees = employees;
      });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;

      console.log(this.isUpdate)
      console.log(employeeData.id)
      
      if(this.isUpdate && employeeData.id ){  
        console.log("inside update")
        this.employeeService.updateEmployee(employeeData.id,employeeData).subscribe({
          next: (response) => {
            console.log("Employee Updated",response)
            this.closeModal()
            this.loadEmployees()
          },
          error: (err) => {
            console.error("Error Updating",err)
          }
        })
        
      }else {
        console.log("inside post")
        console.log("employe data", employeeData)
        this.employeeService.saveEmployee(employeeData).subscribe({
          next: (response) => {
            console.log('Employee Saved', response);
            this.closeModal()
            this.loadEmployees()
          },
          error: (err) => {
            console.error('Error Saving Employee', err);
          },
        });
      }
     
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  closeModal(): void {
    this.showEmployeeForm = false
    this.employeeForm.reset()
    this.isUpdate= false
    this.selectedEmployee = null
    this.cd.detectChanges()
  }

  openEmployeeCreateForm() {
    this.showEmployeeForm = !this.showEmployeeForm;
    this.isUpdate = false
    this.employeeForm.reset()
    this.cd.detectChanges()
  }

  openUpdateEmployeeForm(employee: Employee): void {
    this.isUpdate=true
    this.selectedEmployee=employee
    this.employeeForm.patchValue(employee)
    this.showEmployeeForm = true;
    this.cd.detectChanges()
  }

  deleteEmployee(employee: Employee): void{
    console.log("inside delete")
    console.log("Employee to delete:", employee); // Check the employee object
    this.selectedEmployee = employee

    console.log("employee iD",employee.id!)
  
    this.employeeService.deleteEmployee(employee.id!).subscribe({
      next: (response) => {
        console.log("delete response", response)
        this.loadEmployees()
      },
      error: (err) => {
        console.error("Error occurred while deleting employee:", err);
      }
    })
    
    
  }
}
