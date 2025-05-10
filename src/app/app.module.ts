import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from '@angular/fire/auth';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    // AppComponent,
  ],
  imports: [
    BrowserModule,
    AppComponent,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule, // Angular Material modules
    MatError,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
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
  providers: [
    // AuthService
  ],
  exports: [SharedModule],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
