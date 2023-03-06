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
  pages: number[] = [];
  currentPage: number = 1;

  constructor(
    private userService: UsersService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.goToPage();
  }

  goToPage(page: number = 1): void{
    const gObservable = {
      next: (data: any) => {
        this.pages = this.pagination(data.total_pages);
        this.currentPage = page;
        this.usersList = data.results;
      },
      error: (error: any) => {        
        Swal.fire({
          text: error.message,
          confirmButtonColor: '#3085d6',
          icon: 'warning',
        });
      },
    };    
    this.userService.getUsers(page).subscribe(gObservable)
  }

  pagination(pages: number): number[] {
    let array = [];
    for (let i = 1; i <= pages; i++) {
      array.push(i);
    }
    return array;
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
        const gObservable = {
          next: (data: User) => {
            Swal.fire({
            text: `Usuario ${data._id} eliminado!`,
            confirmButtonColor: '#3085d6',
            icon: 'success'
            })
          },
          error: (error: any) => {
            Swal.fire({
              text: error.message,
              confirmButtonColor: '#3085d6',
              icon: 'warning',
            });
          },
        };
        this.userService.deleteUser(usedId).subscribe(gObservable)
      }      
    }); 
}


}
