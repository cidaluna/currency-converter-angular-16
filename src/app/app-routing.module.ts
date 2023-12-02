import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarMoedasComponent } from "./components/listar-moedas/listar-moedas.component";

const routes: Routes = [
  // cada rota é um endereço url e o nome do componente que deseja exibir na tela
  {
    path:'', component: ListarMoedasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
