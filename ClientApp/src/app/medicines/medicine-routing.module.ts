import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicineCenterComponent } from './medicine-center.component';
import { MedicineMasterComponent } from './medicine-master/medicine-master.component';

const routes: Routes = [{
  path: "",
  component: MedicineCenterComponent,
  children: [
    {
      path: ":key",
      component: MedicineMasterComponent,
    },
    {
      path: "",
      component: MedicineMasterComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule { }
