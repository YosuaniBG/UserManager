import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 
  private url: string ="https://peticiones.online/api/users";

  constructor(private httpClient: HttpClient) { 
  }

  getUsers(): Observable<any>{
    return this.httpClient.get<any>(this.url);
  }

  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(this.url, user)
  }

  readUser(userId: string):Observable<User>{   
    return this.httpClient.get<User>(this.url+'/'+userId)
  }

  updateUser(user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.url}/${user.id}`, user)
  }
}
