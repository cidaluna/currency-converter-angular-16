import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Moeda } from "../models/moeda.model";
import { MensagemService } from "./mensagem.service";

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

  private url = environment.api;
  sigla = ['CAD-BRL','ARS-BRL','GBP-BRL'];

  moeda_dolar_canadense = 'CAD-BRL';
  moeda_peso_chileno = 'ARS-BRL';
  moeda_libra_esterlina = 'GBP-BRL';

  constructor(private http: HttpClient, private mensagemService: MensagemService){}


  // GET /json/last/:moedas
  getMoeda(): Observable<Moeda[]>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'
       })
    };
    return this.http.get<Moeda[]>(this.url + this.sigla, httpOptions)
  .pipe(
    tap((data) => {
      //console.log(`Service: Chamou GET na API: ${this.url + this.sigla}`);
      //console.log('Service: Retornou os dados:',JSON.stringify(data));
    }
    ),
    catchError(this.handleError)
  );
}

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Algo deu errado!' + err.error.message;
    } else {
      errorMessage = 'Erro no request';
    }
    return throwError(errorMessage);
  }

  private log(message: string): void{
    this.mensagemService.add(`Moedas: ${message}!!`)
  }

}
