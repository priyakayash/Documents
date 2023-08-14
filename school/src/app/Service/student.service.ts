import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../class/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseURL = 'http://localhost:8085/upload-file';

  constructor(private httpClient: HttpClient) { }

  addStudent(formData: FormData): Observable<any> {
    console.log(formData);
    return this.httpClient.post(this.baseURL, formData, { responseType: 'text' });
  }

  private apiUrl = 'http://localhost:8085';

  getStudent(username: string): Observable<Student> {
    console.log(username);
    const url = this.apiUrl + '/search/' + username;  // Update the URL construction
    return this.httpClient.get<Student>(url);
  }
}
