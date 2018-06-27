import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { pageReducer } from './store/reducers/pagination.reducer';
import { BookModule } from './book/book.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRouting } from './app-routing';
import { CustomErrorHandler } from './error.handler';
import { ModifyBook, SearchBooks, LoadBooks } from './store/reducers/book.reducer';
import { BookEffects } from './store/effects/book.effect';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    EffectsModule.forRoot([BookEffects]),
    StoreModule.forRoot({
      listBooks: LoadBooks,
      pagination: pageReducer,
      book: ModifyBook,
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
