import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // a origem dos dados está aqui, fornecido valor inicial false
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  hide(): void{
    this.loadingSubject.next(false);
    console.log('[...LOADING...] hide');
  }

  show():void{
    this.loadingSubject.next(true);
    console.log('[...LOADING...] show');
  }

}
