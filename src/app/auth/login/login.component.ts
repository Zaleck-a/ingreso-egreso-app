import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { AuthService } from './../../services/auth.service';
import Swal from 'sweetalert2';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor( private fb: FormBuilder,
               private authServise: AuthService,
               private router: Router,
               private store: Store<AppState>) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
                            this.cargando = ui.isLoading;
                            console.log('cargando subs');
                          })

  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }


  logInUsuario(){

    if(this.loginForm.invalid){ return; }


    this.store.dispatch( ui.isLoading() );

    /* Swal.fire({
      title: 'Cargando',
      didOpen: () => {
        Swal.showLoading()
      }
    }); */

    const { correo, password } = this.loginForm.value;

    this.authServise.logInUsuario(correo, password)
      .then( credenciales => {
        console.log(credenciales);
        // Swal.close();
        this.router.navigateByUrl('/');
        this.store.dispatch( ui.stopLoading() );

      })
      .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      });
  }

}
