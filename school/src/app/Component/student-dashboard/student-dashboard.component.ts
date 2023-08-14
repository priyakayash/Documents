import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/Service/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from 'src/app/class/student';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  student: Student;
  username: string;

  constructor(private route: ActivatedRoute, private router: Router, private studentService: StudentService) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.username = queryParams.username;

    this.route.queryParams.subscribe((user) => {
      this.username = queryParams.username;

    });
    this.getStudent();

  }
  getStudent() {
    this.studentService.getStudent(this.username)
      .subscribe((students: Student) => {
        console.log(students)
        this.student = students;

      

      });
  }

  // displayedColumns: string[] = ['UserName', 'Email', 'First Name', 'Middle Name', 'Last Name', 'Date of Birth', 'Mobile No.', 'Gender', 'Role'];
}
