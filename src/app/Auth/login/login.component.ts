import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  // standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router:Router,
    private toastrService:ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    
  }
  ngOnInit() {
    console.log('LoginComponent initialized');
    // console.log(localStorage.getItem('authToken'));
    
    if(this.authService.isLoggedIn()){
      console.log('login');
      
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnDestroy() {
    console.log('LoginComponent destroyed');
  }
  onLogin() {
    console.log(this.loginForm);
    
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password);
      // this.router.navigate(['/dashboard'])
    }
  }
}
