import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Moeda } from "../models/moeda.model";
import { MensagemService } from "./mensagem.service";

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

  private baseUrl = environment.api;

  constructor(private http: HttpClient, private mensagemService: MensagemService){}

  // Service método GET
  getMoeda(siglaSolicitada: string): Observable<Moeda[]>{
    const montaUrl = `${this.baseUrl}${siglaSolicitada}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'
       })
    };
    return this.http.get<Moeda[]>(montaUrl, httpOptions)
  .pipe(
    catchError(this.handleError)
  );
}

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro na requisição das moedas.';
    if (err.status === 404) {
      errorMessage = `Moeda especificada não existe! ${err}`;
    }
    return throwError(errorMessage);
  }

  private log(message: string): void{
    this.mensagemService.add(`Moedas: ${message}!!`)
  }

}
