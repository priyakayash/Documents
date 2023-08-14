import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { AdminComponent } from './Component/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthService } from './Auth/auth.service';
import { NovbarComponent } from './Component/novbar/novbar.component';
import { AddUserComponent } from './Component/add-user/add-user.component';
import { UpdateUserComponent } from './Component/update-user/update-user.component';
import { AddStudentComponent } from './Component/add-student/add-student.component';
import { StudentDashboardComponent } from './Component/student-dashboard/student-dashboard.component';
import { AddTeacherComponent } from './Component/add-teacher/add-teacher.component';
import { TeacherDashBoardComponent } from './Component/teacher-dash-board/teacher-dash-board.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    NovbarComponent,
    AddUserComponent,
    UpdateUserComponent,
    AddStudentComponent,
    StudentDashboardComponent,
    AddTeacherComponent,
    TeacherDashBoardComponent
  ],
  imports: [
     BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
