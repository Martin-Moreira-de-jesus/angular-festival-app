import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FestivalDetailsComponent } from './festival/festival-details/festival-details.component'
import { FestivalListComponent } from './festival/festival-list/festival-list.component'

const routes: Routes = [
  {
    path: 'festivals',
    component: FestivalListComponent,
  },
  {
    path: 'festivals/new',
    component: FestivalDetailsComponent,
  },
  {
    path: 'festivals/:festivalId',
    component: FestivalDetailsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
