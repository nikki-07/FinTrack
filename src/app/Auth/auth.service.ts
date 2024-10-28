import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth)
  constructor(private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toasterService:ToastrService,
  ) { }

  register(email:string,username:string,password:string):Observable<void>{
    const promise = createUserWithEmailAndPassword(this.firebaseAuth,email,password).then((res)=>{
      const user = res.user;
      sendEmailVerification(user)
        .then(() => {
          this.toasterService.success('Verification email sent!')
          console.log('Verification email sent.');
        });
      updateProfile(res.user,{
        displayName:username
      })
      this.router.navigate(['/login'])
    }).catch((err)=>{
        this.toasterService.error('Failed to register',err)
    })
    return from(promise)
  }
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((res) => {
        console.log(res.user);
        
        
        if (res.user?.emailVerified) {
          // Check if the user's email is verified
          console.log('Login Successful and email is verified', res.user);
          this.toasterService.success('Login Successful')
          res.user.getIdToken().then((token) => {
            localStorage.setItem('authToken', token)
            // localStorage.setItem('authToken', token); // Save token for authentication
          });
          this.router.navigate(['/dashboard']); // Navigate to dashboard if login is successful

          console.log(res);
        } else {
          // If email is not verified, show a message to the user
          console.error('Please verify your email before logging in.');
        }
      })
      .catch((error) => {
        // Handle different types of login errors
        if (error.code === 'auth/user-not-found') {
          console.error('No user found with this email.');
        this.toasterService.error('No user found with this email.',error)

        } else if (error.code === 'auth/wrong-password') {
          console.error('Incorrect password.');
        this.toasterService.error('Incorrect password.',error)

        } else {
          console.error('Login Error: ', error);
        this.toasterService.error('Login Error.',error)

        }
      });
  
    return from(promise);
  }
  
  

      // Simulated method for checking if the user is logged in
      isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
          return !!localStorage.getItem('authToken'); // Replace 'yourToken' with your actual key
        }
        return false; // Return false for SSR context
      }



  // Simulated logout method
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login'])
  }
}
