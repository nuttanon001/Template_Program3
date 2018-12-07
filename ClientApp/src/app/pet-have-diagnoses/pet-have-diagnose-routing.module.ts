import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetHaveDiagnoseCenterComponent } from './pet-have-diagnose-center.component';
import { PetHaveDiagnoseMasterComponent } from './pet-have-diagnose-master/pet-have-diagnose-master.component';
import { PetHaveDiagnoseHistoryComponent } from './pet-have-diagnose-history/pet-have-diagnose-history.component';

const routes: Routes = [{
  path: "",
  component: PetHaveDiagnoseCenterComponent,
  children: [
    {
      path: "history",
      component: PetHaveDiagnoseHistoryComponent,
    },
    {
      path: ":key",
      component: PetHaveDiagnoseMasterComponent,
    },
    {
      path: "",
      component: PetHaveDiagnoseMasterComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetHaveDiagnoseRoutingModule { }
