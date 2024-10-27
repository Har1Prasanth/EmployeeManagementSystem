import { Injectable } from '@angular/core';
import { lookup } from 'dns';
import { Observable, of } from 'rxjs';

interface User{
  username: string
  password: string
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
  ]

  private currentUser: User | null = null
  

  constructor() { }

  login(username: string, password: string):Observable<boolean>{
    const user = this.users.find(u => u.username === username && u.password === password)
    if(user){
      this.currentUser = user
      if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated','true')
      localStorage.setItem('userRole',user.role)
      localStorage.setItem('userName',user.username)
      }
      return of(true)
    }else{
      return of(false)
    }
  }

  logout(){
    this.currentUser=null
    if (typeof window !== 'undefined') {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    }
  }

  isLoggedIn(): boolean{
    if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true'
    }
    return false
  }

  getRole(): string | null {
    if (typeof window !== 'undefined') {
    return localStorage.getItem('userRole')
    }
    return ''
  }

  getUsername(): string {

    if (typeof window !== 'undefined') {
    return localStorage.getItem('userName') || 'User'
    }

    return 'User'
  }
}
