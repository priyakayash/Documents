import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../class/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8085/users/add";

  addUser(user: User): Observable<object> {
    console.log(user)
    return this.httpClient.post(this.baseURL, user);
  }

  private URL = "http://localhost:8085/users";

  public getAllUsers() {
    return this.httpClient.get<User[]>(this.URL);
  }

  public deleteUser(id: number) {
    return this.httpClient.delete('http://localhost:8085/users/' + id);
  }

  private apiUrl = 'http://localhost:8085/users';
  searchUsersByFirstName(firstName: string): Observable<User[]> {
    const url = this.apiUrl + '/search?firstName=' + firstName;
    return this.httpClient.get<User[]>(url);
  }

  getUpdateById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.URL + '/' + id);

  }

  updateEmployee(id: number, user: User): Observable<Object> {
    return this.httpClient.put(this.URL + '/' + id, user);
  }



}