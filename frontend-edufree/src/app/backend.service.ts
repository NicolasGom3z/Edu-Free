import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  rutaRaiz = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getRequest(controlador:string):Observable<any>{

    return this.http.get(this.rutaRaiz + '/' +controlador)

  }

  postRequest(controlador:string, datos :string){

    // const headers = new Headers({'Content-Type':'application/json'});

    return this.http.post(this.rutaRaiz + '/' +controlador, 
                          datos, 
                          { headers: new HttpHeaders({ 'Content-Type': 'application/json'})})

  }


}
