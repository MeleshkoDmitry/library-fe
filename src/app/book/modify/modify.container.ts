import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
    selector: 'app-modify-container-book',
    template: `<app-post-a-book
         [book]="book"
         (moveBack)="viewBooks()"
         (save)="modify($event)"></app-post-a-book>`,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModifyBookContainerComponent {
    book: Book;

    constructor(private route: ActivatedRoute,
        private bookService: BookService,
        private router: Router) {
        const _id = this.route.snapshot.paramMap.get('id');
        _id ? this.book = this.route.snapshot.data.book : this.book = new Book();
    }

    modify(event: Book): void {
        let actionService;
        this.book._id ? actionService = this.bookService.editBook(event._id, event)
            : actionService = this.bookService.addBook(event);
        actionService.subscribe((result) => {
            this.router.navigate(['/books/viewbook/', result._id]);
        });
    }

    viewBooks() {
        this.router.navigate(['/books']);
    }
}
