import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.scss']
})
export class UserPerfilComponent implements OnInit{

  user: User = {
    id: 0,
    first_name:'',
    last_name:'',
    username:'',
    email:'',
    image:'https://via.placeholder.com/150'
  }

  constructor(
    private activateRoute: ActivatedRoute, 
    private userService: UsersService
    ){ }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params =>{
      this.userService.getOne(params['id']).subscribe(data => {
        this.user = data;               
      })   
    })
  }
}
