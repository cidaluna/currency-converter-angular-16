# Desafio Currency Converter

O Projeto Currency Converter é uma aplicação desenvolvida em Angular, que consome a ** API de Cotações AwesomeAPI ** em tempo real, para mostrar a conversão de três moedas para Real brasileiro (BRL).

![Página Web com três cards representando o resultado de conversão de moedas retornados via API](https://github.com/cidaluna/currency-converter-angular-16/blob/main/src/assets/tela-conversao-de-moedas-para-o-Real-Brasileiro-em-Angular-16-Cida-Luna.PNG)

## Vamos começar ?

Para rodar essa aplicação, siga os próximos passos.

### Requisitos

* Angular 16.2.0 [Angular CLI](https://github.com/angular/angular-cli)
* Node.JS versão 18.10.0 [Node.js](https://nodejs.org/)

Verifique a compatibilidade do Angular x Node.JS em [Angular versions](https://angular.io/guide/versions).

### Clonando o projeto

1. Clone o repositório currency-converter-angular-16

```bash
git clone https://github.com/cidaluna/currency-converter-angular-16.git
```

2. Acesse o diretório do projeto

```bash
cd currency-converter-angular-16
```

3. Instale as dependências

```bash
npm install
```

4. Inicie o servidor da aplicação local

```bash
npm start
```

## Navegando pelo projeto Angular 16

Após rodar o start, abra o navegador e visite o link http://localhost:4200 para visualizar a aplicação Currency Converter.

## API de Cotações

Exemplos:
* http://economia.awesomeapi.com.br/json/last/USD-BRL
* http://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL
* https://economia.awesomeapi.com.br/json/last/USD-BRL,CLP-BRL,GBP-BRL

* http://economia.awesomeapi.com.br/xml/USD-BRL/1
* http://economia.awesomeapi.com.br/USD-BRL/1?format=xml

## Legenda API de Cotações

| Key | Label |
| --- | --- |
| bid | Compra |
| ask | Venda |
| varBid | Variação |
| pctChange | Porcentagem de Variação |
| high | Máximo |
| low | Mínimo |


## Testes unitários 

Utilize o comando `ng test` para executar os testes unitários dessa aplicação via [Karma](https://karma-runner.github.io).

## Fonte utilizada Poppins

A fonte utilizada neste projeto foi a Poppins e está disponível em [Google Fonts](https://fonts.google.com/specimen/Poppins).

## Instalando versão específica do Angular

Comandos
```bash
npm install -g @angular/cli@16.2.0
npm install -g npx
npx @angular/cli@16 new nome-do-seu-projeto
```

## Exemplo de primeiro commit no GitHub

Comandos
```bash
echo "# currency-converter-angular-16" >> README.md
  git init
  git add README.md
  git commit -m "first commit" 
  git branch -M main 
  git remote add origin https://github.com/cidaluna/currency-converter-angular-16.git 
  git push -u origin main 
```

## Desenvolvedora

By Cida Luna 11/2023.
