import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../auth/authservice.service';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthserviceService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public error: any;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private auths: AuthserviceService,
    public formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  ngOnInit() {
    
  }
  

  loginUser(): void {

    this.auths.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then(authData => {
        if (this.loginForm.value.email == 'admin@admin.com') {
          this.router.navigate(['/home']);
        }
        else {
          this.router.navigate(['/']);
        }
      })
  }
}
