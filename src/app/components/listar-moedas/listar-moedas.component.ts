import { Component, OnInit } from '@angular/core';
import { Moeda } from 'src/app/models/moeda.model';
import { MoedaService } from 'src/app/services/moeda.service';


@Component({
  selector: 'app-listar-moedas',
  templateUrl: './listar-moedas.component.html',
  styleUrls: ['./listar-moedas.component.css']
})
export class ListarMoedasComponent implements OnInit {

  //public moedasSiglas = ['CAD-BRL','ARS-BRL','GBP-BRL'];
  listaDeMoedas: Moeda[] = [];

  constructor(private moedaService: MoedaService){
    //console.log('Componente: Chamou constructor listar-moedas');
  }

  ngOnInit(): void{
    this.obterMoedas();
  }

  obterMoedas(){
    this.moedaService.getMoeda().subscribe(
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

}
