import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-formulary',
  templateUrl: './formulary.component.html',
  styleUrls: ['./formulary.component.scss']
})
export class FormularyComponent implements OnInit {

  title: string = "NUEVO USUARIO";
  signForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private activateRoute: ActivatedRoute
    ){
    this.signForm = this.builder.group({
      first_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl('', [ Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl(''),
    }) 
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      if(params.id){
        this.title = "ACTUALIZAR USUARIO";

        this.userService.readUser(params['id']).subscribe(data => {
          this.signForm = new FormGroup({
            id: new FormControl(params.id),
            first_name: new FormControl(data?.first_name, [Validators.required, Validators.minLength(3)]),
            last_name: new FormControl(data?.last_name,[ Validators.required, Validators.minLength(2)]),
            email: new FormControl(data?.email, [Validators.required, Validators.email]),
            image: new FormControl(data?.image),
          })
        });   
      }
    })
  }

  enviar(values: User) {
    if(values.id){
        Swal.fire({
          text: `Realmente desea actualizar los datos del usuario con ID: ${values.id} ?`,
          showCancelButton: true,
          confirmButtonText: 'Actualizar',
          confirmButtonColor: '#3085d6',
          icon: 'question'
        })
        .then(result =>{
          if(result.isConfirmed)
          {
            const gObservable = {
              next: (data: User) => {
                Swal.fire({
                  text: `Usuario ${data._id} actualizado!`,
                  confirmButtonColor: '#3085d6',
                  icon: 'success'
                })
                this.router.navigate(["/home"])
                this.signForm.reset(); 
              },
              error: (error: any) => {
                Swal.fire({
                  text: error.message,
                  confirmButtonColor: '#3085d6',
                  icon: 'warning'
                })                
              }
            }
            this.userService.updateUser(values).subscribe(gObservable)
          }      
        }); 
    }else{
      const gObservable = {
        next: (data: User) => {
          Swal.fire({
                title: 'Excelente!',
                text: `El nuevo usuario ${data.first_name} ${data.last_name} se ha guardado satisfactoriamente`,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                footer: `ID asignado: ${data.id}`
              })
              .then(result =>{
                if(result.isConfirmed)
                    this.router.navigate(["/home"])
              }); 
        },
        error: (error: any) => {
          Swal.fire({
            text: error.message,
            confirmButtonColor: '#3085d6',
            icon: 'warning'
          })
          
        }
      }
      this.userService.createUser(values).subscribe(gObservable)
    }

    
  }

}