import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookDetailsComponent } from './shared/components/book-details/book-details.component';
import { CommentsListComponent } from './shared/components/comments-list/comments-list.component';

const routes: Routes = [
  { path: 'nowosci', loadChildren: ()=>import('./novelties/novelties.module').then(m=>m.NoveltiesModule)},
  { path: 'promocje', loadChildren: ()=>import('./promos/promos.module').then(m=>m.PromosModule)},
  { path: 'admin', loadChildren: ()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  { 
    path: 'ksiazka/:id', 
    component: BookDetailsComponent,
    children: [
      { path: 'recenzje', component: CommentsListComponent }
    ]
   },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
