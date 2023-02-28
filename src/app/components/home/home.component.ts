import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  usersList: User[] = [];

  constructor(private userService: UsersService){}

  ngOnInit(): void {
    this.userService.getAll().subscribe(data => {
      this.usersList = data.results;
      console.log(this.usersList);
      
    })
  }

}
