import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { AdminComponent } from './Component/admin/admin.component';
import { AdminGuard } from './Auth/admin.guard';
// import { NovbarComponent } from './Component/novbar/novbar.component';
import { AddUserComponent } from './Component/add-user/add-user.component';
import { UpdateUserComponent } from './Component/update-user/update-user.component';
import { AddStudentComponent } from './Component/add-student/add-student.component';
import { StudentDashboardComponent } from './Component/student-dashboard/student-dashboard.component';
import { AddTeacherComponent } from './Component/add-teacher/add-teacher.component';
import { TeacherDashBoardComponent } from './Component/teacher-dash-board/teacher-dash-board.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // {path:'navbar',component:NovbarComponent},
  { path: 'user', component: AddUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  {
    path: 'admin', component: AdminComponent,
     canActivate: [AdminGuard]
  },
  { path: 'student', component: AddStudentComponent },
  { path: 'stud', component: StudentDashboardComponent },
  { path: 'teacher', component: AddTeacherComponent },
  { path: 'teach', component: TeacherDashBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
