import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { BodyComponent } from './components/body/body.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'ems', component: BodyComponent, canActivate: [AuthGuard] },  // Protect EMS page
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
