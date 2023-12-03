import { Component, OnInit } from '@angular/core';
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
  sigla2 = 'ARS-BRL';
  sigla3 = 'GBP-BRL';

  tresMoedas = ['CAD-BRL','ARS-BRL','GBP-BRL'];

  siglaErro: any;

  constructor(private moedaService: MoedaService){}

  ngOnInit(): void{
    this.obterMoedas(this.tresMoedas);
    //this.obterMoedas(this.sigla2);
    //this.obterMoedas(this.sigla3);
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
        this.listaDeMoedas = [];
        console.log('Lista erro', this.listaDeMoedas);
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


}
