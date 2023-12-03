import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Moeda } from 'src/app/models/moeda.model';
import { MoedaService } from 'src/app/services/moeda.service';


@Component({
  selector: 'app-listar-moedas',
  templateUrl: './listar-moedas.component.html',
  styleUrls: ['./listar-moedas.component.css']
})
export class ListarMoedasComponent implements OnInit {

  listaDeMoedas: Moeda[] = [];
  erroCard: boolean = false;
  sigla1 = 'CAD-BRL';
  sigla2 = 'QARS-BRL';
  sigla3 = 'GBP-BRL';

  carregarTodas = ['CAD-BRL','ARS-BRL','GBP-BRL'];

  siglaErro: any;

  constructor(private moedaService: MoedaService){}

  ngOnInit(): void{
    this.obterMoedas(this.sigla1);
    this.obterMoedas(this.sigla2);
    this.obterMoedas(this.sigla3);
  }

  obterMoedas2(valor: string){
    this.moedaService.getMoeda(valor).subscribe(
      (data: any) => {
        this.listaDeMoedas = Object.keys(data).map(key => data[key]);
        // testes com console.log
        //const chaves =  Object.keys(data);
        //console.log('Componente: Método obterMoedas a partir dos Objetos x Chaves: ', chaves);
        //const moedasMapeadas = chaves.map(key => data[key]);
        //console.log('Moedas mapeadas e atribuidas a listaDeMoedas:', moedasMapeadas);
      },
      (error: any) => {
        console.error('Erro ao carregar as moedas', error);
      }
    );
  }

  //novo
  obterMoedas3(valor: string){
    this.moedaService.getMoeda(valor)
  .pipe(
    catchError((error) => {
      console.log("CatchError : aconteceu algo errado aqui...", error);
      this.erroCard = true;
      console.log(this.erroCard);
      return of(null);
      })
    ).subscribe((data: any) => {
      if(data){
        this.listaDeMoedas = Object.keys(data).map(key => data[key]);
        this.erroCard = false;
      }else{
        this.listaDeMoedas = [];
        this.erroCard = true;
      }
    });
  }

  //novo teste para recuperar titulo da moeda bad request erro
  obterMoedas(valor: any){
    this.moedaService.getMoeda(valor)
    .subscribe({
      next: (data: any) => {
        this.listaDeMoedas = Object.keys(data).map(key => data[key]);
        this.erroCard = false;
        // testes com console.log
        const chaves =  Object.keys(data);
        console.log('Componente: Método obterMoedas a partir dos Objetos x Chaves: ', chaves);
        const moedasMapeadas = chaves.map(key => data[key]);
        console.log('Moedas mapeadas e atribuidas a listaDeMoedas:', moedasMapeadas);
        const moedaName = Object.keys(data).map(key => data[key]['name']);
        console.log('Pegar o name da Moeda:', moedaName);
      },
      error: (error: any) => {
        console.error('Erro ao carregar as moedas...', error);
        this.erroCard = true;
        this.siglaErro = Object.keys(error).map(key => error[key]['name']);
      },
      complete: () => {
        console.log('complete');
      }
    }
    );
  }


/*
      (data: any[]) => {
        this.listaDeMoedas = Object.keys(data).map(key => data[key]);
        this.erroCard = false;
        // testes com console.log
        const chaves =  Object.keys(data);
        console.log('Componente: Método obterMoedas a partir dos Objetos x Chaves: ', chaves);
        const moedasMapeadas = chaves.map(key => data[key]);
        console.log('Moedas mapeadas e atribuidas a listaDeMoedas:', moedasMapeadas);
        const moedaName = Object.keys(data).map(key => data[key]['name']);
        console.log('Pegar o name da Moeda:', moedaName);
      },
      (error: any) => {
        console.error('Erro ao carregar as moedas...', error);
        this.erroCard = true;
        this.siglaErro = Object.keys(error).map(key => error[key]['name']);
      }
    );
  }
*/
}
