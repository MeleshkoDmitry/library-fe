import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { pageReducer } from './common/reducers/pagination';
import { BookModule } from './book/book.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRouting } from './app-routing';
import { CustomErrorHandler } from './error.handler';
import { ModifyBookReducer, ViewListBooks, SearchBooks } from './common/reducers/modify.book';
import { EffectsModule } from '@ngrx/effects';
import { ModifyEffects } from './common/effects/modify.books';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // EffectsModule.forRoot([ModifyEffects]),
    StoreModule.forRoot({
      pagination: pageReducer,
      book: ModifyBookReducer,
      listBooks: ViewListBooks,
      searchBooks: SearchBooks
    }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BookModule,
    AppRouting,
  ],
  exports: [
    RouterModule
  ],
  providers: [{ provide: ErrorHandler, useClass: CustomErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
