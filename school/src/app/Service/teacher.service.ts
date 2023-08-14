import { Injectable } from '@angular/core';
import { Teacher } from '../class/teacher';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
 
  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8085/teachers";

  addTeacher(teacher: Teacher): Observable<object> {
    console.log(teacher)
    return this.httpClient.post(this.baseURL, teacher);
  }

  private apiUrl = 'http://localhost:8085';

  getTeacher(username: string): Observable<Teacher> {
    // console.log(username);
    const url = this.apiUrl + '/teacher/' + username;  // Update the URL construction
    return this.httpClient.get<Teacher>(url);
  }
}
