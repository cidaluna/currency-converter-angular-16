import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarNumeroPipe'
})
export class FormatarNumeroPipe implements PipeTransform {

  transform(valor: any) {
    const numero = Number(valor);
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}
