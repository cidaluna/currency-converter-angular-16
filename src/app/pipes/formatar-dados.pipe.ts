import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarValorCard',
})
export class FormatarValorPipe implements PipeTransform {
  transform(valor: any) {
    const numero = Number(valor);
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}

@Pipe({
  name: 'formatarTextoCard'
})
export class FormatarTextoPipe implements PipeTransform {
  transform(texto: any): string {
    const partes = texto.split('/'); // separa o texto quando encontrar o /
    // se existir pelo menos um elemento, retorna a posicao 0 removendo os espaços em branco
    return partes.length > 0 ? partes[0].trim() : texto;
  }
}

@Pipe({
  name: 'formatarHorarioCard'
})
export class FormatarHorarioPipe implements PipeTransform {
  transform(data: any): string {
    const dataObj = new Date(data);
    // sintaxe dateObj.toLocaleDateString([locales [, options]])
    // console.log(new Date().toLocaleDateString("pt-BR"));
    return dataObj.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
