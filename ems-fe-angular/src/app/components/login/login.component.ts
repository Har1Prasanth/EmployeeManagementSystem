import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.username = '';
    this.password = '';
  }

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          console.log('Login Successful');
          this.router.navigate(['/ems']);
        } else {
          console.error('Invalid Credentials')
          this.errorMessage = 'Invalid username or password'
        }
      },
      error: (err) => {
        console.error('Login Failed', err);
      },
    });
  }
}
