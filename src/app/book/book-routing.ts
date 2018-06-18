import { PostABookComponent } from './post-a-book/post-a-book.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { ViewABookComponent } from './view-a-book/view-a-book.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewBookResolver } from './viewBook.resolver';

const bookRoutes: Routes = [
  {
    path: 'books',
    children: [
      { path: '', component: ListBooksComponent },
      { path: 'addbook', component: PostABookComponent },
      { path: 'viewbook/:id', component: ViewABookComponent, resolve: { book: ViewBookResolver } },
      { path: 'editbook/:id', component: PostABookComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule],
  providers: [ViewBookResolver]
})

export class BookRouting { }
