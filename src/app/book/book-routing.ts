import { ModifyComponent } from './modify/post-a-book.component';
import { ViewABookComponent } from './view/view-a-book.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewBookResolver } from './view.book.resolver';
import { BookContainerComponent } from './list/book.container';
import { EditBookResolver } from './edit.book.resolver';

const bookRoutes: Routes = [
  {
    path: 'books',
    children: [
      { path: '', component: BookContainerComponent },
      { path: 'addbook', component: ModifyComponent },
      { path: 'viewbook/:id', component: ViewABookComponent, resolve: { book: ViewBookResolver } },
      { path: 'editbook/:id', component: ModifyComponent, resolve: { book: EditBookResolver } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule],
  providers: [ViewBookResolver, EditBookResolver]
})

export class BookRouting { }
