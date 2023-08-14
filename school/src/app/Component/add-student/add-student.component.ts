import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/Service/student.service';
import { Student } from 'src/app/class/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  // student: Student = new Student();
  file: File = null;

  constructor(private studentService: StudentService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.studentForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required],
      classname: ['', Validators.required],
     
      fileName: ['', Validators.required],
     
    });

  }
  onChange(event) {
    console.log(event);

    this.file = event.target.files[0];

  }

  addStudent() {
    console.log("1")
    const role = this.studentForm.value;
    console.log(role);
    const formData = new FormData();
    const file = this.file;
    console.info(file)
    formData.append('file', file);
    // Add the 'user' part to the FormData object
    const user = {
      first_name: role.first_name,
      last_name: role.last_name,
      email: role.email,
      classname: role.classname,
      username: role.username,
      role: "Student"
    };

    formData.append('user', JSON.stringify(user));

    this.studentService.addStudent(formData).subscribe((data: any) => {
      this.router.navigate(['/admin']).then(() => {
        location.reload();
      });
    }, (error: any) => {
      console.log(error);
    });
  }
  clearForm() {
    this.studentForm.reset();
  }

}


