import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LivroService {

  apiUrl: string = "http://localhost:8000/api/"

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  httpHeadersDois: any = {
    headers: {
      'Authorization': 'Bearer '+ localStorage.getItem('userToken'),
    }
  }
  livrosVenda() {
    return this.HttpClient.get(this.apiUrl + 'listaLivroTrue/', this.httpHeaders);
  }
  listaLivroTrue( ): Observable<any> {
    return this.HttpClient.get( this.apiUrl + 'listaLivroTrue', this.httpHeaders);
  }
  listHistorico( ): Observable<any> {
    this.httpHeaders.headers["Authorization"] = 'Bearer ' + localStorage.getItem('userToken');
    return this.HttpClient.get( this.apiUrl + 'listHistorico', this.httpHeaders);
  }
  showLivro(id:number): Observable<any> {
    return this.HttpClient.get( this.apiUrl + 'mostraLivro/' + id , this.httpHeaders);
  }
  criaLivro(form): Observable<any> {
    this.httpHeaders.headers["Authorization"] = 'Bearer ' + localStorage.getItem('userToken');
    return this.HttpClient.post(this.apiUrl + 'criaLivro', form, this.httpHeadersDois); 
  }
  compraLivro(id:number): Observable<any> {
    this.httpHeaders.headers["Authorization"] = 'Bearer ' + localStorage.getItem('userToken');
    return this.HttpClient.put( this.apiUrl + 'compraLivro/' + id , null, this.httpHeaders);
  }
  updateGenero(form, id){
    return this.HttpClient.put( this.apiUrl + 'atualizaGenero/' + id , form, this.httpHeaders);
  }
  mostraOferta(id): Observable<any> {
    return this.HttpClient.get(this.apiUrl + 'mostraOferta/' + id, this.httpHeaders);
  }
listaLivro(): Observable<any> {
  return this.HttpClient.get( this.apiUrl + 'listaLivros', this.httpHeaders);
  }

  constructor(public HttpClient: HttpClient) { }
}
