import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListarMoedasComponent } from './listar-moedas/listar-moedas.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarMoedasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
