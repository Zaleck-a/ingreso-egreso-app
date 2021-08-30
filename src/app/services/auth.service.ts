import { Usuario } from './../models/usuario.mode';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from './../auth/auth.actions';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }


  initAuthListener(){
    this.auth.authState.subscribe( fuser => {

      // console.log(fuser?.uid);
      if(fuser){

        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe( (firestorUser: any) => {

            console.log(firestorUser)
            const user = Usuario.fromFirebase(firestorUser)

            this.store.dispatch( authActions.setUser({user}));

          } )

      }else{
        this.userSubscription.unsubscribe();
        this.store.dispatch( authActions.unSetUser());
      }
    })
  }


  crearUsuario( nombre: string, correo: string, password:string ){

    // console.log({nombre, correo, password});

    return this.auth.createUserWithEmailAndPassword(correo, password)
              .then(( { user } ) => {
                const newUser = new Usuario( user.uid, nombre, correo);

                return this.firestore.doc(`${user.uid}/usuario`).set({...newUser})

              })
  }

  logInUsuario( correo: string, password:string ){

    // console.log({nombre, password});

    return this.auth.signInWithEmailAndPassword(correo, password);
  }


  logout(){
    return this.auth.signOut();
  }


  isAuth(){
    return this.auth.authState.pipe(
      map( fuser => fuser != null)
    )
  }

}
