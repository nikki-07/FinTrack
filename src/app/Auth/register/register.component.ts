import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  onRegister() {
    if (this.registerForm.invalid) return;

    const { email, username, password } = this.registerForm.value;
    this.isLoading = true;

    this.authService.register(email, username, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Registered successfully!', 'Close', {
          duration: 3000,
        });
        this.registerForm.reset();
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(error.message || 'Registration failed.', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
