import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogregComponent } from './logreg/logreg.component';
import { BrowseComponent } from './browse/browse.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
	{path:'', pathMatch: 'full', component: LogregComponent },
	{path:'browse', pathMatch: 'full', component: BrowseComponent },
	{path:'listings', pathMatch: 'full', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
