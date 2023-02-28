import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 
  url: string ="https://peticiones.online/api/users";

  constructor(private httpClient: HttpClient) { 
  }

  getAll(): Observable<any>{
    return this.httpClient.get<any>(this.url);
  }

  getOne(userId: string):Observable<User>{   
    return this.httpClient.get<User>(this.url+'/'+userId)
  }
}
