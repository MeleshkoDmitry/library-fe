import { ModifyComponent } from './modify/post-a-book.component';
import { ListBooksComponent } from './list/list-books.component';
import { ViewABookComponent } from './view/view-a-book.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookResolver } from './book.resolver';
import { BookContainer } from './book.container';

const bookRoutes: Routes = [
  {
    path: 'books',
    children: [
      { path: '', component: BookContainer },
      { path: 'addbook', component: ModifyComponent },
      { path: 'viewbook/:id', component: ViewABookComponent, resolve: { book: BookResolver } }, // resolve: { book: BookResolver }
      { path: 'editbook/:id', component: ModifyComponent } // resolve: { book: BookResolver }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule],
  providers: [BookResolver]
})

export class BookRouting { }
