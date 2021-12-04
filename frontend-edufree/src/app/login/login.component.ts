import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

interface Usuario {
  codigo : string,
  password : string
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  formLogin:any;

  constructor(private formBuilder:FormBuilder) {

    this.formLogin = this.formBuilder.group({
      codigo: ['',Validators.required],
      password: ['',Validators.required]
    });

  }

  ngOnInit(): void {
  }

  autenticar():void{

    const pass = Md5.hashStr(this.formLogin.controls.password.value);
    
    const json = this.formLogin.getRawValue();

    alert(JSON.stringify(json));

  }

}
