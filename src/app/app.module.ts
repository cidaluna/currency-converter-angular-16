import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarMoedasComponent } from './components/listar-moedas/listar-moedas.component';
import { FormatarNumeroPipe } from './pipes/formatar-numero.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListarMoedasComponent,
    FormatarNumeroPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
