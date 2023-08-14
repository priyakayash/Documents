import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/Service/teacher.service';
import { Teacher } from 'src/app/class/teacher';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  teacherForm: FormGroup;

  teacher: Teacher = new Teacher();

  constructor(private teacherService: TeacherService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  addTeacher() {

    if (this.teacherForm.valid) {
      const teacher = this.teacherForm.value;
      teacher.role = 'Teacher'; // Set the role property to 'Teacher'
      this.teacherService.addTeacher(teacher).subscribe(
        data => {
          alert("Teacher successfully registered");
          this.router.navigate(['/admin']);
        },
        error => {
          alert("Teacher registration failed");
        }
      );
    } else {
      // Mark all form fields as touched to display validation errors
      this.teacherForm.markAllAsTouched();
    }
   
  }

}
