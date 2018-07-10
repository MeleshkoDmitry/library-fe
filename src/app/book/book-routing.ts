import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewBookResolver } from './resolvers/view.book.resolver';
import { BookContainerComponent } from './list/list.book.container';
import { EditBookResolver } from './resolvers/edit.book.resolver';
import { ViewBookContainerComponent } from './view/view.book.container';
import { ModifyBookContainerComponent } from './modify/modify.container';

const bookRoutes: Routes = [
  {
    path: 'books',
    children: [
      { path: '', component: BookContainerComponent, pathMatch: 'full' },
      { path: 'search', component: BookContainerComponent },
      { path: 'addbook', component: ModifyBookContainerComponent },
      { path: 'viewbook/:id', component: ViewBookContainerComponent, resolve: { book: ViewBookResolver } },
      { path: 'editbook/:id', component: ModifyBookContainerComponent, resolve: { book: EditBookResolver } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule],
  providers: [ViewBookResolver, EditBookResolver]
})

export class BookRouting { }
