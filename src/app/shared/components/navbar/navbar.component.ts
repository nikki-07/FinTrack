import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { AuthService } from '../../../Auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private authService:AuthService){

  }
  logOut(){
    this.authService.logout()

  }
}
