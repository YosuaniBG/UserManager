import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.scss'],
})
export class UserPerfilComponent implements OnInit {
  user: User = {
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: 'https://via.placeholder.com/150',
  };

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      const gObservable = {
        next: (data: User) => {
          this.user = data;
        },
        error: (error: any) => {               
          Swal.fire({
            text: error.message,
            confirmButtonColor: '#3085d6',
            icon: 'warning',
          });
        },
      };
      this.userService.readUser(params['id']).subscribe(gObservable);
    });
  }

  deleteUser(usedId: any): void {
    Swal.fire({
      text: `Realmente desea eliminar al usuario con ID: ${usedId} ?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#3085d6',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        const gObservable = {
          next: (data: User) => {
            Swal.fire({
              text: `Usuario ${data._id} eliminado!`,
              confirmButtonColor: '#3085d6',
              icon: 'success',
            });
            this.router.navigate(['/home']);
          },
          error: (error: any) => {
            Swal.fire({
              text: error.message,
              confirmButtonColor: '#3085d6',
              icon: 'warning',
            });
          },
        };
        this.userService.deleteUser(usedId).subscribe(gObservable);
      }
    });
  }
}
