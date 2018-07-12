import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';

@Component({
    selector: 'app-view-container-book',
    template: `<app-view-a-book
    [book]="book"
    (moveBack)="viewBooks()"></app-view-a-book>`,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewBookContainerComponent {
    book: Book;
    constructor(private route: ActivatedRoute, private router: Router) {
        this.book = this.route.snapshot.data.book;
    }

    viewBooks() {
        this.router.navigate(['/books']);
    }
}
