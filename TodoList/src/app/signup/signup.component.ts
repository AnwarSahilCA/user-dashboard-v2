import { Component } from '@angular/core';
import { User } from '../model/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 
  user: User;
  confirmPassword: string;

  constructor() {
    this.user = new User('', '', '', '', '');
    this.confirmPassword = '';
  }

  signUp(): void {
    // Perform signup logic here
    console.log('Sign up form submitted');
    console.log('User:', this.user);
    console.log('Confirm Password:', this.confirmPassword);
    // Add your signup logic to register the user
  }
}



