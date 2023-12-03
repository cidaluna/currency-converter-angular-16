import { Component, OnInit } from '@angular/core';
import { MoedaService } from 'src/app/services/moeda.service';


@Component({
  selector: 'app-listar-moedas',
  templateUrl: './listar-moedas.component.html',
  styleUrls: ['./listar-moedas.component.css']
})
export class ListarMoedasComponent implements OnInit {

  listaDeMoedas: any[] = [];
  erroCard: boolean = false;
  siglaErro: string = '';

  constructor(private moedaService: MoedaService){}

  ngOnInit(): void{
    this.obterMoedas();
  }

  obterMoedas(){
    const carregarTresMoedas = ['CAD-BRL','ARS-BRL','GBP-BRL'];

    carregarTresMoedas.forEach(sigla => {
      this.moedaService.getMoeda(sigla)
      .subscribe({
        next: (data: any) => {
          const moeda = Object.keys(data).map(key => data[key]);
          const moedaExiste = this.verificaMoedaExiste(moeda[0],sigla);

            if(moedaExiste){
              this.listaDeMoedas.push(moeda[0]);
              this.erroCard = false;
            }else {
              this.erroCard = true;
              this.siglaErro = sigla;
            }
          //const chaves =  Object.keys(data);
          //console.log('[COMP - NEXT]: Método obterMoedas a partir dos Objetos x Chaves: ', chaves);
        },
        error: (error: any) => {
         //console.error(`[COMP - ERROR]: Erro ao carregar as moedas ${sigla}`, error);
         this.listaDeMoedas.push({ error, sigla });
         this.erroCard = true;
        },
        complete: () => {
          console.log('[COMP - COMPLETE]: complete');
        }
      });
    });
  }

  verificaMoedaExiste(moeda: any, sigla: string): any{
    if (moeda && moeda['name'] !== undefined && !isNaN(parseFloat(moeda['bid']))) {
      return moeda;
    } else {
      console.error(`Moeda ${sigla} inválida. Campos: undefined ou NaN.`);
      return null;
    }
  }

  recarregarMoeda(sigla: string) {
      // Encontrar o índice da moeda na lista
      const index = this.listaDeMoedas.findIndex(item => item.sigla === sigla);

      if (index !== -1) {
        // Remover a moeda da lista
        this.listaDeMoedas.splice(index, 1);

        // Recarregar a moeda
        this.moedaService.getMoeda(sigla).subscribe(
          (data: any) => {
            this.listaDeMoedas.push(data);
          },
          (error: any) => {
            console.error(`Erro ao carregar moeda ${sigla}:`, error);
            this.listaDeMoedas.push({ error, sigla });
          }
        );
      }
    }
}
