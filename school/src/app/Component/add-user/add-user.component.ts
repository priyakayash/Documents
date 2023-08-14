import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/class/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(private registerService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      middlename: [''],
      lastname: [''],
      password: ['', Validators.required],
      dob: ['', Validators.required],
      mobilenumber: [''],
      gender: ['male'],
      role: ['Student']
    });
  }

  userRegister() {
    const role = this.userForm.value;
    // Add user registration logic here

    this.registerService.addUser(role).subscribe(
      () => {
        alert('Successfully registered user');
        this.router.navigate(['/admin']);
      },
      () => {
        alert('Failed to register user');
      }
    );
  }

  clearForm() {
    this.userForm.reset();
  }
 }
