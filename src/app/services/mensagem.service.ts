import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MensagemService {
  private messages: string[] = [];

  getMessages(): string[]{
    return this.messages;
  }
}
