import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router){}
  
  onLogout(): void{
    this.authService.logout()
    this.router.navigate(['/login'])
  }
  getUsername(): string {
    return this.authService.getUsername(); // Get username from AuthService
  }
  

}
