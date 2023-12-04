import { Component, OnInit } from '@angular/core';
import { Moeda } from 'src/app/models/moeda.model';
import { LoadingService } from 'src/app/services/loading.service';
import { MoedaService } from 'src/app/services/moeda.service';


@Component({
  selector: 'app-listar-moedas',
  templateUrl: './listar-moedas.component.html',
  styleUrls: ['./listar-moedas.component.css']
})
export class ListarMoedasComponent implements OnInit {

  listaDeMoedas: Moeda[] = [];
  erroCard: boolean = false;
  siglaErro: string = '';

  // Salvar um estado na aplicação
  cache = new Map<string,Moeda[]>();

  constructor(private moedaService: MoedaService, public loading: LoadingService){}

  ngOnInit(): void{
    this.obterMoedas();
  }

  obterMoedas(){
    const carregarTresMoedas = ['CAD-BRL','ARS-BRL','GBP-BRL'];

    carregarTresMoedas.forEach(sigla => {
      this.moedaService.getMoeda(sigla)
      .subscribe({
        next: (data: Moeda[]) => {
          if (this.cache.has(sigla)) {
            console.log(`[COMP]: Dados da moeda ${sigla} carregados do cache!`);
          } else {
            console.log(`[COMP]: Dados da moeda ${sigla} carregados pela primeira vez!`);
          }

          const moeda = data;
          const moedaExiste = this.verificaMoedaExiste(moeda[0], sigla);

          if (moedaExiste) {
            this.listaDeMoedas.push(moeda[0]);
            this.erroCard = false;
          } else {
            this.erroCard = true;
            this.siglaErro = sigla;
          }

          console.log('[COMP - NEXT]: Moeda ', moeda);
          console.log('[COMP - NEXT]: MoedaExiste', moedaExiste);
        },
        error: (error) => {
          const errorObject = { error: error };
          this.listaDeMoedas.push(errorObject);
          this.erroCard = true;
          console.log('[COMP - ERROR]: ' + error);
        },
        complete: () => {
          console.log('[COMP - COMPLETE]: complete');
        }
      });
    });
  }

  verificaMoedaExiste(moeda: any, sigla: string){
    if (moeda && moeda['name'] !== undefined && !isNaN(parseFloat(moeda['bid']))) {
      return moeda;
    } else {
      console.error(`Moeda ${sigla} inválida. Campos: undefined ou NaN.`);
      return null;
    }
  }

  // refazer o recarregar
  recarregarMoeda(siglaInformada: string) {
    this.moedaService.getMoeda(siglaInformada)
    .subscribe({
      next: (data: any) => {
        const moeda = Object.keys(data).map(key => data[key]);
        this.listaDeMoedas = moeda;
        this.erroCard = false;
      },
      error: (error: any) => {
       this.listaDeMoedas = error;
       this.erroCard = true;
      },
      complete: () => {}
    });
  };
}
