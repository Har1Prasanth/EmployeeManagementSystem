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
  filteredEmployees: Employee[] = [];
  showEmployeeForm: Boolean = false;
  employeeForm: FormGroup;
  isUpdate = false;
  selectedEmployee: Employee | null = null;

  //filters
  availableDepartments: string[] = [];
  availableRoles: string[] = [];
  selectedDepartments: string[] = [];
  selectedRoles: string[] = [];
  selectedActiveStatus: boolean | null = null;
  searchQuery: string = '';
  areFiltersVisible: boolean = true;
  selectedFilters: string[] = [];

  active: boolean = false
  inactive: boolean = false

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.loadEmployees();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
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
      department: ['', Validators.required],
      role: ['', Validators.required],
      active: ['']
    });
  }

  loadEmployees() {
    this.employeeService
      .fetchAllEmployees()
      .subscribe((employees: Employee[]) => {
        console.log('employees', employees);
        this.employees = employees;
        this.filteredEmployees = employees;

        const departmentSet = new Set<string>();
        const roleSet = new Set<string>();

        this.employees.forEach((employee) => {
          if (employee.department) {
            departmentSet.add(employee.department);
          }
          if (employee.role) {
            roleSet.add(employee.role);
          }
        });

        this.availableDepartments = Array.from(departmentSet)
        this.availableRoles = Array.from(roleSet)
      })
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;

      console.log(this.isUpdate);
      console.log(employeeData.id);

      if (this.isUpdate && employeeData.id) {
        console.log('inside update');
        this.employeeService
          .updateEmployee(employeeData.id, employeeData)
          .subscribe({
            next: (response) => {
              console.log('Employee Updated', response);
              this.closeModal();
              this.loadEmployees();
            },
            error: (err) => {
              console.error('Error Updating', err);
            },
          });
      } else {
        console.log('inside post');
        console.log('employe data', employeeData);
        this.employeeService.saveEmployee(employeeData).subscribe({
          next: (response) => {
            console.log('Employee Saved', response);
            this.closeModal();
            this.loadEmployees();
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
    this.showEmployeeForm = false;
    this.employeeForm.reset();
    this.isUpdate = false;
    this.selectedEmployee = null;
    this.cd.detectChanges();
  }

  openEmployeeCreateForm() {
    this.showEmployeeForm = !this.showEmployeeForm;
    this.isUpdate = false;
    this.employeeForm.reset();
    this.cd.detectChanges();
  }

  openUpdateEmployeeForm(employee: Employee): void {
    this.isUpdate = true;
    this.selectedEmployee = employee;
    this.employeeForm.patchValue(employee);
    this.showEmployeeForm = true;
    this.cd.detectChanges();
  }

  deleteEmployee(employee: Employee): void {
    console.log('inside delete');
    console.log('Employee to delete:', employee); // Check the employee object
    this.selectedEmployee = employee;

    console.log('employee iD', employee.id!);

    this.employeeService.deleteEmployee(employee.id!).subscribe({
      next: (response) => {
        console.log('delete response', response);
        this.loadEmployees();
      },
      error: (err) => {
        console.error('Error occurred while deleting employee:', err);
      },
    });
  }

  toggleFilter() {
    this.areFiltersVisible = !this.areFiltersVisible;
  }

  clearFilter(): void {
    this.searchQuery = '';
    this.selectedFilters = [];
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredEmployees = this.employees.filter((employee) => {
      const matchesSearchQuery =
        this.searchQuery === '' ||
        employee.firstName
          ?.toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        employee.lastName
          ?.toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        employee.email?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        employee.department?.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        employee.role?.toLowerCase().includes(this.searchQuery.toLowerCase())

      const matchesDepartment =
        this.selectedDepartments.length === 0 ||
        this.selectedDepartments.includes(employee.department!);

      const matchesRole =
        this.selectedRoles.length === 0 ||
        this.selectedRoles.includes(employee.role!);

      let matchesSelectedFilter = false;
  
       matchesSelectedFilter =
      (this.active && employee.active) || (this.inactive && !employee.active) ||
      (!this.active && !this.inactive)

      return (
        matchesSearchQuery &&
        matchesDepartment &&
        matchesRole &&
        matchesSelectedFilter
      );
    });
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onTextFilterChanges(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
    // this.saveSlotFilterState()
  }

  onSelectedSlotFilterChange(filterOptions: {yes: boolean; no: boolean}): void {
    this.active = filterOptions.yes
    this.inactive = filterOptions.no
    this.applyFilters()
  }
}
