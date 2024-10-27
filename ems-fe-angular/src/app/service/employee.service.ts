import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

   apiUrl = "http://localhost:8060/api/employees"

  constructor(private httpClient: HttpClient) {
   }

  fetchAllEmployees(): Observable<Employee[]> {
  
    return this.httpClient.get<Employee[]>(`${this.apiUrl}`)
  }

  saveEmployee(employee: Employee): Observable<Employee>{
    console.log("employee in service", employee)
    return this.httpClient.post<Employee>(this.apiUrl,employee)
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.httpClient.patch<Employee>(`${this.apiUrl}?id=${id}`,employee)
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.httpClient.delete<Employee>(`${this.apiUrl}/${id}`)
  }
}
