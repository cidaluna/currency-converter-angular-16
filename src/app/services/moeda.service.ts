import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, interval, map, of, shareReplay, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { Moeda } from "../models/moeda.model";

@Injectable({
  providedIn: 'root'
})
export class MoedaService {

  private baseUrl = environment.api;
  private moedaCache$: Observable<Moeda[]>  = null!;

  constructor(private http: HttpClient){ }

  buscaDados(siglaSolicitada: string): Observable<Moeda[]> {
    // Verifica se há dados em cache
    if (!this.moedaCache$) {
      console.log('[SERVICE]: Não há dados em cache. Carregando pela primeira vez.')
      this.moedaCache$ = this.getMoeda(siglaSolicitada).pipe(
        // Cache por 3 minutos (180000 milissegundos)
        shareReplay(1),
        catchError(() => {
          // Limpar cache em caso de erro
          this.moedaCache$ = of([]);
          console.log('[SERVICE] Limpar cache em caso de erro')
          return this.moedaCache$;
        }),
        // Atualização automática a cada 3 minutos
        switchMap(() => interval(180000).pipe(switchMap(() => {
          console.log('[SERVICE] Atualização automática acionada!');
          return this.getMoeda(siglaSolicitada);
        })))
      );
    }

    return this.moedaCache$;
  }

  getMoeda(siglaSolicitada: string): Observable<Moeda[]> {
    const montaUrl = `${this.baseUrl}${siglaSolicitada}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'
       })
    };

    return this.http.get<Moeda[]>(montaUrl, httpOptions)
    .pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '[SERVICE]: Ocorreu um erro na requisição das moedas.';
    if (err.status === 404) {
      errorMessage = `[SERVICE]: Moeda especificada não existe! ${err}`;
    }
    return of([]);
  }

}
