import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, switchMap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private _cache: Map<
  string,
  {
    expireDate: Date;
    response: HttpResponse<any>;
  }
> = new Map();

private _refreshSubject: Subject<string> = new Subject();
private _requestCount = 0;
private _maxUpdates = 10;

constructor() {}

intercept(
  request: HttpRequest<any>,
  next: HttpHandler
): Observable<HttpEvent<any>> {
  if (request.method !== 'GET') {
    return next.handle(request);
  }

  if (this._requestCount >= this._maxUpdates) {
    console.log('[CacheInterceptor] Limite máximo de solicitações atingido. Não armazenando em cache:', request.url);
    return next.handle(request);
  }

  const cachedResponse = this._cache.get(request.url);
  console.log('[CachedResponse]:::', cachedResponse);


  if (cachedResponse && cachedResponse.expireDate > new Date()) {
    return of(cachedResponse.response);
  }

   // Se não houver resposta em cache ou a resposta estiver expirada
   return this._sendRequest(request, next).pipe(
    catchError(() => of(null)),
    switchMap((response: any) => {
      if (response) {
        // Cache a resposta
        const expireDate = new Date(Date.now() + 1 * 60 * 1000);  // 1 minuto em milisegundos
        console.log('Expira em: ',expireDate);
        this._cache.set(request.url, {
          expireDate: expireDate,
          response: response
        });

       // Atualize o cache automaticamente após 3 minutos
       this._refreshSubject.next(request.url);
       // Verifique o limite de atualizações
       this._requestCount++;
       if (this._requestCount >= this._maxUpdates) {
         this._refreshSubject.complete(); // Pare de emitir atualizações
       }
     }
     return of(response);
   })
 );
}

  private _sendRequest(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}
