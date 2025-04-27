import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from '@angular/fire/auth';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatError,
    MatButtonModule,
    AuthModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 5000, // Change the display duration
      positionClass: 'toast-top-right', // Change the position
      preventDuplicates: true, // Prevent duplicate notifications
      closeButton: true, // Show close button
      progressBar: true, // Show a progress bar
    }),
  ],
  providers: [],
  exports: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
