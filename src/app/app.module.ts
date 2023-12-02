import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarMoedasComponent } from './components/listar-moedas/listar-moedas.component';
import { FormatarCorPipe, FormatarHorarioPipe, FormatarTextoPipe, FormatarValorPipe } from './pipes/formatar-dados.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListarMoedasComponent,
    FormatarCorPipe,
    FormatarHorarioPipe,
    FormatarTextoPipe,
    FormatarValorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
