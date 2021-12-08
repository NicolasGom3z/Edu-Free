import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  rutaRaiz = 'http://localhost:3000';
  token:string = ''
  isAuthenticate:boolean = false;
  autorized : boolean = true;


  constructor(private http:HttpClient) { 

    this.ValidarAutenticacion();

  }

  ValidarAutenticacion(): void {

    const token =  localStorage.getItem('tokenedu');

    if(token){
      this.token = token;
      this.isAuthenticate = true;
    }

  }

  getRequest(nombreControlador:string):Observable<any>{

    return this.http.get(this.rutaRaiz + '/' +nombreControlador,
          { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}`})}
          
          );
  }

  getRequest2(nombreControlador:string,id:string):Observable<any>{

    return this.http.get(this.rutaRaiz + '/' +nombreControlador + '/' + id + 'grupos',
          { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}`})}
          
          );
  }

  postRequest(nombreControlador:string, datos :string){

    // const headers = new Headers({'Content-Type':'application/json'});

    return this.http.post(this.rutaRaiz + '/' +nombreControlador, 
                          datos, 
                          { headers: new HttpHeaders(
                            { 'Content-Type': 'application/json',
                              'Authorization': `Bearer ${this.token}`})})

  }
  

  postRequest2(nombreControlador:string,id:string, datos :string){

    // const headers = new Headers({'Content-Type':'application/json'});

    return this.http.post(this.rutaRaiz + '/' +nombreControlador + '/' + id + '/grupos', 
                          datos, 
                          { headers: new HttpHeaders(
                            { 'Content-Type': 'application/json',
                              'Authorization': `Bearer ${this.token}`})})

  }
  


  authenticateRequest(credenciales :string){

    // const headers = new Headers({'Content-Type':'application/json'});

    return this.http.post(this.rutaRaiz + '/autenticar', 
                          credenciales, 
                          { headers: new HttpHeaders({ 'Content-Type': 'application/json'})})

  }
  
  patchRequest(nombreControlador:string, id: string,datos :string){
  
  
      return this.http.patch(this.rutaRaiz + '/' +nombreControlador +'/' + id , 
                            datos, 
                            { headers: new HttpHeaders
                              ({ 'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.token}`})})
  
  }


  deleteRequest(nombreControlador:string, id: string){
  
  
      return this.http.delete(this.rutaRaiz + '/' +nombreControlador +'/' + id ,
                            { headers: new HttpHeaders
                              ({ 'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.token}`})})
  
  }
  deleteRequest2(nombreControlador:string, id: string){
  
  
      return this.http.delete(this.rutaRaiz + '/' +nombreControlador +'/' + id + '/grupos' ,
                            { headers: new HttpHeaders
                              ({ 'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.token}`})})
  
  }
  


}
