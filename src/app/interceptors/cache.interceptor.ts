import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

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
  private readonly _maxUpdates = 10;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    if (this._requestCount >= this._maxUpdates) {
      console.log(
        '[CacheInterceptor] Limite máximo de solicitações atingido. Não armazenando em cache:',
        request.url
      );
      return next.handle(request);
    }

    const cachedResponse = this._cache.get(request.url);

    if (cachedResponse && cachedResponse.expireDate > new Date()) {
      console.log('[CacheInterceptor] Usando resposta em cache para:', request.url);
      return of(cachedResponse.response);
    }

   // Se não houver resposta em cache ou a resposta estiver expirada
   return this._sendRequest(request, next).pipe(
    catchError((error) => {
      // Limpar o cache em caso de erro
      this._cache.delete(request.url);
      return throwError(error);
    }),
    switchMap((event) => {
      if (event instanceof HttpResponse) {
        const expireDate = new Date(Date.now() + 3 * 60 * 1000); // 3 minutos em milissegundos
        console.log('[CacheInterceptor] Expira em:', expireDate);
        this._cache.set(request.url, {
          expireDate: expireDate,
          response: event,
        });

        // Atualize o cache automaticamente após 3 minutos
        this._refreshSubject.next(request.url);

        // Verifique o limite de atualizações
        this._requestCount++;
        if (this._requestCount >= this._maxUpdates) {
          console.log(
            '[CacheInterceptor] Limite de atualizações atingido. Parando de emitir atualizações.'
          );
          this._refreshSubject.complete(); // Pare de emitir atualizações
        }
      }
      return of(event);
    }),
    switchMap(() => throwError(''))
  );
}

private _sendRequest(
  request: HttpRequest<any>,
  next: HttpHandler
): Observable<HttpEvent<any>> {
  return next.handle(request);
}
}
