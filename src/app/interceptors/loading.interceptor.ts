import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.activeRequests === 0){ // se nao tem nenhuma requisicao feita, mostra o loading material spinner
      this.loadingService.show();
      console.log('Chamou loading show');
    }
    this.activeRequests++;  // incrementa 1

    // em seguida, faz a requisicao e passa a requisicao pra frente e no pipe diminui o contador e esconde o loading material spinner
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;

        if(this.activeRequests === 0){
          this.loadingService.hide();
          console.log('Chamou loading hide');
        }
      })
    )
  }
}
