import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { BookModule } from './book/book.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRouting } from './app-routing';
import { CustomErrorHandler } from './error.handler';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule,
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
