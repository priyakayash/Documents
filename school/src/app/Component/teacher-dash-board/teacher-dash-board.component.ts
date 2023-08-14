import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/Service/teacher.service';
import { Teacher } from 'src/app/class/teacher';

@Component({
  selector: 'app-teacher-dash-board',
  templateUrl: './teacher-dash-board.component.html',
  styleUrls: ['./teacher-dash-board.component.css']
})
export class TeacherDashBoardComponent implements OnInit {
  teacher: Teacher;
  username: string;

  constructor(private route: ActivatedRoute, private router: Router, private teacherService: TeacherService) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.username = queryParams.username;

    this.route.queryParams.subscribe((teacher) => {
      this.username = queryParams.username;
      console.log(this.username)


    });
    this.getTeacher();

  }
  getTeacher() {
    this.teacherService.getTeacher(this.username)
      .subscribe((teachers: Teacher) => {
        // console.log(teachers)
        this.teacher = teachers;
        // console.log(this.teacher)


      });
  }

}