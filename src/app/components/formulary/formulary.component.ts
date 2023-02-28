import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-formulary',
  templateUrl: './formulary.component.html',
  styleUrls: ['./formulary.component.scss']
})
export class FormularyComponent {

  signForm: FormGroup 

  constructor(private builder: FormBuilder){
    this.signForm = this.builder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl('',[ Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl(''),
    })
   
    
  }

  enviar(values:any) {
    if(values.image === "")
      values.image = "https://via.placeholder.com/150";

    console.log(values);
    
    Swal.fire("Excelente!", "El nuevo usuario se ha guardado satisfactoriamente", "success"); 
    this.signForm.reset();
  }

}
