import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  usersList: User[] = [];

  constructor(
    private userService: UsersService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.usersList = data.results;      
    })
  }

  deleteUser(usedId: any): void{
    Swal.fire({
      text: `Realmente desea eliminar al usuario con ID: ${usedId} ?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#3085d6',
      icon: 'question'
    })
    .then(result =>{
      if(result.isConfirmed)
      {
        this.userService.deleteUser(usedId).subscribe((data: User) => {          
          Swal.fire({
            text: `Usuario ${data._id} eliminado!`,
            confirmButtonColor: '#3085d6',
            icon: 'success'
          })
        })
      }      
    }); 
}


}
