import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/Service/loginservice.service';
import { Login } from 'src/app/class/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private login: LoginserviceService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  formSubmit() {

    if (this.loginForm.invalid) {
      alert("Username and Password are required");
      return;
    }

    const role = this.loginForm.value;
    console.log(role)

    this.login.generateToken(role).subscribe((data: any) => {
      sessionStorage.setItem('token', data.token)
      localStorage.setItem('user', role.username);
      localStorage.setItem('password', role.password);

      this.login.getCurrentUser().subscribe((user: any) => {
        this.login.setUser(user);
        // console.log(role.username);

        const queryParams: any = { username: role.username };

        // console.log(queryParams);

        if (this.login.getUserRole() == 'Admin') {

          this.router.navigate(['/admin'], { queryParams: queryParams });
        }
        else if (this.login.getUserRole() == 'Student') {
          this.router.navigate(['/stud'], { queryParams: queryParams });
        }

        else if (this.login.getUserRole() == 'Teacher') {
          this.router.navigate(['/teach'], { queryParams: queryParams });
        }
      });

    }, error => alert("password and username wrong"));
  }


}
