import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  rutaRaiz = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getRequest(nombreControlador:string):Observable<any>{

    return this.http.get(this.rutaRaiz + '/' +nombreControlador)

  }

  postRequest(nombreControlador:string, datos :string){

    // const headers = new Headers({'Content-Type':'application/json'});

    return this.http.post(this.rutaRaiz + '/' +nombreControlador, 
                          datos, 
                          { headers: new HttpHeaders({ 'Content-Type': 'application/json'})})

  }

  // patchRequest(controlador:string, datos :string, id: string){

  //   // const headers = new Headers({'Content-Type':'application/json'});

  //   return this.http.patch(this.rutaRaiz + '/' +nombreControlador, 
  //                         datos, 
  //                         { headers: new HttpHeaders({ 'Content-Type': 'application/json'})})

  // }


}
