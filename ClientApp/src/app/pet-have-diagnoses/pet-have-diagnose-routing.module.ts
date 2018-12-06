import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetHaveDiagnoseCenterComponent } from './pet-have-diagnose-center.component';
import { PetHaveDiagnoseMasterComponent } from './pet-have-diagnose-master/pet-have-diagnose-master.component';

const routes: Routes = [{
  path: "",
  component: PetHaveDiagnoseCenterComponent,
  children: [
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
